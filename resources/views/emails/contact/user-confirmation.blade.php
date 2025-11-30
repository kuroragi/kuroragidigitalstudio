<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Message</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }

        .container {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 300;
        }

        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
        }

        .content {
            padding: 40px 30px;
        }

        .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 25px;
        }

        .message-summary {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }

        .summary-row {
            margin: 12px 0;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }

        .summary-row:last-child {
            border-bottom: none;
        }

        .summary-label {
            font-weight: bold;
            color: #555;
            display: inline-block;
            width: 100px;
        }

        .summary-value {
            color: #333;
        }

        .service-badge {
            background: #667eea;
            color: white;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
        }

        .what-happens-next {
            background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
        }

        .what-happens-next h3 {
            color: #667eea;
            margin-top: 0;
            margin-bottom: 15px;
        }

        .steps {
            list-style: none;
            padding: 0;
        }

        .steps li {
            margin: 12px 0;
            padding-left: 30px;
            position: relative;
        }

        .steps li:before {
            content: "✓";
            position: absolute;
            left: 0;
            top: 0;
            background: #667eea;
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
        }

        .contact-info {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
            text-align: center;
        }

        .contact-info h4 {
            color: #667eea;
            margin-top: 0;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #667eea;
            text-decoration: none;
            font-weight: bold;
        }

        .footer {
            background: #f8f9fa;
            text-align: center;
            padding: 25px;
            color: #666;
            font-size: 14px;
        }

        .footer a {
            color: #667eea;
            text-decoration: none;
        }

        .signature {
            margin: 30px 0;
            font-style: italic;
            color: #666;
        }

        .highlight {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
        }

        .highlight strong {
            color: #856404;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Thank You!</h1>
            <p>We've received your message and we're excited to work with you</p>
        </div>

        <div class="content">
            <div class="greeting">
                Hello <strong>{{ $contact->name }}</strong>,
            </div>

            <p>Thank you for reaching out to <strong>Kuroragi Digital Studio</strong>! We've received your inquiry and
                are thrilled about the opportunity to potentially work together on your project.</p>

            <div class="highlight">
                <strong>Response Time:</strong> We typically respond to all inquiries within <strong>24 hours</strong>,
                often sooner during business hours.
            </div>

            <div class="message-summary">
                <h4 style="margin-top: 0; color: #667eea;">Your Message Summary</h4>

                <div class="summary-row">
                    <span class="summary-label">Subject:</span>
                    <span class="summary-value">{{ $contact->subject }}</span>
                </div>

                @if($contact->service)
                <div class="summary-row">
                    <span class="summary-label">Service:</span>
                    <span class="summary-value">
                        @switch($contact->service)
                        @case('web-development')
                        <span class="service-badge">Web Development</span>
                        @break
                        @case('ui-ux-design')
                        <span class="service-badge">UI/UX Design</span>
                        @break
                        @case('mobile-development')
                        <span class="service-badge">Mobile Development</span>
                        @break
                        @case('cloud-devops')
                        <span class="service-badge">Cloud & DevOps</span>
                        @break
                        @case('digital-branding')
                        <span class="service-badge">Digital Branding</span>
                        @break
                        @case('consulting')
                        <span class="service-badge">Consulting</span>
                        @break
                        @default
                        <span class="service-badge">{{ ucfirst(str_replace('-', ' ', $contact->service)) }}</span>
                        @endswitch
                    </span>
                </div>
                @endif

                @if($contact->timeline)
                <div class="summary-row">
                    <span class="summary-label">Timeline:</span>
                    <span class="summary-value">
                        @switch($contact->timeline)
                        @case('asap')
                        ASAP (Priority Response)
                        @break
                        @case('1-month')
                        Within 1 Month
                        @break
                        @case('1-3-months')
                        1-3 Months
                        @break
                        @case('3-6-months')
                        3-6 Months
                        @break
                        @case('6-months-plus')
                        6+ Months
                        @break
                        @case('flexible')
                        Flexible Timeline
                        @break
                        @default
                        {{ ucfirst(str_replace('-', ' ', $contact->timeline)) }}
                        @endswitch
                    </span>
                </div>
                @endif

                <div class="summary-row">
                    <span class="summary-label">Submitted:</span>
                    <span class="summary-value">{{ $contact->created_at->format('M j, Y \a\t g:i A') }}</span>
                </div>
            </div>

            <div class="what-happens-next">
                <h3>What Happens Next?</h3>
                <ul class="steps">
                    <li>Our team will review your project requirements carefully</li>
                    <li>We'll prepare a personalized response addressing your specific needs</li>
                    <li>You'll receive a detailed follow-up email within 24 hours</li>
                    <li>If there's a good fit, we'll schedule a consultation call to discuss your project in detail</li>
                </ul>
            </div>

            <p>In the meantime, feel free to explore our portfolio and recent case studies on our website to get a
                better sense of our work and approach.</p>

            <div class="contact-info">
                <h4>Need to reach us immediately?</h4>
                <p>
                    <strong>Email:</strong> <a
                        href="mailto:hello@kuroragidigital.studio">hello@kuroragidigital.studio</a><br>
                    <strong>Phone:</strong> +1 (555) 123-4567
                </p>

                <div class="social-links">
                    <a href="#">LinkedIn</a> |
                    <a href="#">Twitter</a> |
                    <a href="#">Instagram</a> |
                    <a href="#">Dribbble</a>
                </div>
            </div>

            <div class="signature">
                <p>Best regards,<br>
                    <strong>The Kuroragi Digital Studio Team</strong><br>
                    <em>Crafting Digital Excellence</em>
                </p>
            </div>

            <p style="font-size: 14px; color: #666; margin-top: 30px;">
                <strong>Reference ID:</strong> #{{ $contact->id }}<br>
                Please keep this reference ID for your records.
            </p>
        </div>

        <div class="footer">
            <p>
                <strong>Kuroragi Digital Studio</strong><br>
                Transforming Ideas Into Digital Reality<br>
                <a href="{{ config('app.url') }}">{{ config('app.url') }}</a>
            </p>
            <p style="margin-top: 15px; font-size: 12px;">
                This is an automated confirmation email. Please do not reply to this email.<br>
                For any questions, contact us at <a
                    href="mailto:hello@kuroragidigital.studio">hello@kuroragidigital.studio</a>
            </p>
        </div>
    </div>
</body>

</html>