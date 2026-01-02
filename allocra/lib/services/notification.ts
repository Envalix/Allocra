/**
 * Email Notification Service
 *
 * Abstraction layer for sending email notifications via various providers.
 * Supports Brevo (Sendinblue), Resend, and Mock providers.
 *
 * Usage:
 *   import { sendEmail, sendDcaTriggerAlert } from '@/lib/services/notification';
 */

import { serverEnv } from '@/lib/config/env';

// ============================================
// Types
// ============================================

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  tags?: string[];
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface DcaAlertData {
  userName: string;
  planName: string;
  stockSymbol: string;
  stockName: string;
  currentPrice: number;
  triggerReason: 'price_drop' | 'scheduled' | 'target_reached';
  recommendedAmount: number;
  recommendedShares?: number;
  actionUrl: string;
}

// ============================================
// Email Provider Interface
// ============================================

interface EmailProvider {
  send(options: EmailOptions): Promise<EmailResult>;
}

// ============================================
// Mock Provider (Development/Testing)
// ============================================

const mockProvider: EmailProvider = {
  async send(options: EmailOptions): Promise<EmailResult> {
    // Log email in development
    console.log('📧 [MOCK EMAIL]', {
      to: options.to,
      subject: options.subject,
      preview: options.text?.substring(0, 100) || 'HTML email',
    });

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return {
      success: true,
      messageId: `mock-${Date.now()}`,
    };
  },
};

// ============================================
// Brevo Provider (Placeholder)
// ============================================

const brevoProvider: EmailProvider = {
  async send(options: EmailOptions): Promise<EmailResult> {
    // TODO: Implement Brevo (Sendinblue) API integration
    // API Docs: https://developers.brevo.com/docs/send-a-transactional-email
    //
    // Example implementation:
    // const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    //   method: 'POST',
    //   headers: {
    //     'api-key': serverEnv.brevoApiKey!,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     sender: {
    //       email: serverEnv.brevoSenderEmail,
    //       name: serverEnv.brevoSenderName,
    //     },
    //     to: Array.isArray(options.to)
    //       ? options.to.map(email => ({ email }))
    //       : [{ email: options.to }],
    //     subject: options.subject,
    //     htmlContent: options.html,
    //     textContent: options.text,
    //   }),
    // });
    //
    // const data = await response.json();
    // return { success: response.ok, messageId: data.messageId };

    console.warn('Brevo provider not implemented, using mock');
    return mockProvider.send(options);
  },
};

// ============================================
// Resend Provider (Placeholder)
// ============================================

const resendProvider: EmailProvider = {
  async send(options: EmailOptions): Promise<EmailResult> {
    // TODO: Implement Resend API integration
    // API Docs: https://resend.com/docs/api-reference/emails/send-email
    //
    // Example implementation:
    // const response = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${serverEnv.resendApiKey}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     from: serverEnv.resendSenderEmail,
    //     to: options.to,
    //     subject: options.subject,
    //     html: options.html,
    //     text: options.text,
    //   }),
    // });
    //
    // const data = await response.json();
    // return { success: response.ok, messageId: data.id };

    console.warn('Resend provider not implemented, using mock');
    return mockProvider.send(options);
  },
};

// ============================================
// Provider Factory
// ============================================

function getProvider(): EmailProvider {
  if (!serverEnv.enableEmailNotifications) {
    return mockProvider;
  }

  switch (serverEnv.emailProvider) {
    case 'brevo':
      return brevoProvider;
    case 'resend':
      return resendProvider;
    case 'mock':
    default:
      return mockProvider;
  }
}

// ============================================
// Public API
// ============================================

/**
 * Send a raw email
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const provider = getProvider();
  return provider.send(options);
}

/**
 * Send DCA trigger alert email
 */
export async function sendDcaTriggerAlert(
  email: string,
  data: DcaAlertData
): Promise<EmailResult> {
  const triggerMessage = getTriggerMessage(data.triggerReason);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; }
        .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; }
        .footer { background: #1e293b; color: #94a3b8; padding: 20px; border-radius: 0 0 12px 12px; text-align: center; font-size: 14px; }
        .price-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
        .cta-button { display: inline-block; background: #2563eb; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 20px 0; }
        .highlight { color: #2563eb; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 24px;">🎯 DCA Alert</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">${triggerMessage}</p>
        </div>
        <div class="content">
          <p>Hi ${data.userName},</p>
          <p>Your DCA plan <strong>${data.planName}</strong> has triggered an alert.</p>
          
          <div class="price-box">
            <h3 style="margin: 0 0 10px 0;">${data.stockSymbol} - ${data.stockName}</h3>
            <p style="margin: 5px 0;">Current Price: <span class="highlight">$${data.currentPrice.toFixed(2)}</span></p>
            <p style="margin: 5px 0;">Recommended Investment: <span class="highlight">$${data.recommendedAmount.toFixed(2)}</span></p>
            ${data.recommendedShares ? `<p style="margin: 5px 0;">≈ ${data.recommendedShares.toFixed(4)} shares</p>` : ''}
          </div>
          
          <a href="${data.actionUrl}" class="cta-button">View Plan & Take Action →</a>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
            This is an automated alert from your Allocra DCA plan. 
            You can manage your notification preferences in your account settings.
          </p>
        </div>
        <div class="footer">
          <p style="margin: 0;">Allocra - Smart DCA Investing</p>
          <p style="margin: 5px 0 0 0; font-size: 12px;">Discipline beats timing.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
DCA Alert: ${triggerMessage}

Hi ${data.userName},

Your DCA plan "${data.planName}" has triggered an alert.

${data.stockSymbol} - ${data.stockName}
Current Price: $${data.currentPrice.toFixed(2)}
Recommended Investment: $${data.recommendedAmount.toFixed(2)}
${data.recommendedShares ? `Approximately ${data.recommendedShares.toFixed(4)} shares` : ''}

Take action: ${data.actionUrl}

---
Allocra - Smart DCA Investing
  `.trim();

  return sendEmail({
    to: email,
    subject: `🎯 DCA Alert: ${data.stockSymbol} - ${triggerMessage}`,
    html,
    text,
    tags: ['dca-alert', data.triggerReason],
  });
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(
  email: string,
  userName: string
): Promise<EmailResult> {
  // TODO: Implement welcome email template
  return sendEmail({
    to: email,
    subject: 'Welcome to Allocra - Start Your DCA Journey',
    html: `<h1>Welcome, ${userName}!</h1><p>Start building wealth with disciplined investing.</p>`,
    text: `Welcome, ${userName}! Start building wealth with disciplined investing.`,
    tags: ['welcome'],
  });
}

// ============================================
// Helper Functions
// ============================================

function getTriggerMessage(reason: DcaAlertData['triggerReason']): string {
  switch (reason) {
    case 'price_drop':
      return 'Price Drop Opportunity';
    case 'scheduled':
      return 'Scheduled Investment Time';
    case 'target_reached':
      return 'Target Price Reached';
    default:
      return 'Investment Alert';
  }
}

export default {
  sendEmail,
  sendDcaTriggerAlert,
  sendWelcomeEmail,
};
