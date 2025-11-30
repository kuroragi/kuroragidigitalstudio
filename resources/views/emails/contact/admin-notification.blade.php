<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }

        .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }

        .contact-info {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .contact-info h3 {
            color: #667eea;
            margin-top: 0;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }

        .info-row {
            margin: 15px 0;
            padding: 10px;
            background: #f8f9fa;
            border-left: 4px solid #667eea;
        }

        .label {
            font-weight: bold;
            color: #555;
            display: inline-block;
            width: 120px;
        }

        .value {
            color: #333;
        }

        .message-box {
            background: white;
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            white-space: pre-wrap;
        }

        .priority {
            background: #ff6b6b;
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
        }

        .service-tag {
            background: #667eea;
            color: white;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 12px;
            display: inline-block;
            margin-top: 5px;
        }

        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 14px;
        }

        .timestamp {
            color: #888;
            font-size: 14px;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>New Contact Form Submission</h1>
        <p>{{ config('app.name') }} - Admin Notification</p>
    </div>

    <div class="content">
        <p>You have received a new contact form submission from your website.</p>

        <div class="contact-info">
            <h3>Contact Information</h3>

            <div class="info-row">
                <span class="label">Name:</span>
                <span class="value">{{ $contact->name }}</span>
            </div>

            <div class="info-row">
                <span class="label">Email:</span>
                <span class="value">{{ $contact->email }}</span>
            </div>

            @if($contact->organization)
            <div class="info-row">
                <span class="label">Organization:</span>
                <span class="value">{{ $contact->organization }}</span>
            </div>
            @endif

            @if($contact->phone)
            <div class="info-row">
                <span class="label">Phone:</span>
                <span class="value">{{ $contact->phone }}</span>
            </div>
            @endif

            <div class="info-row">
                <span class="label">Subject:</span>
                <span class="value">{{ $contact->subject }}</span>
            </div>

            @if($contact->service)
            <div class="info-row">
                <span class="label">Service:</span>
                <span class="value">
                    @switch($contact->service)
                    @case('web-development')
                    <span class="service-tag">Web Development</span>
                    @break
                    @case('ui-ux-design')
                    <span class="service-tag">UI/UX Design</span>
                    @break
                    @case('mobile-development')
                    <span class="service-tag">Mobile Development</span>
                    @break
                    @case('cloud-devops')
                    <span class="service-tag">Cloud & DevOps</span>
                    @break
                    @case('digital-branding')
                    <span class="service-tag">Digital Branding</span>
                    @break
                    @case('consulting')
                    <span class="service-tag">Consulting</span>
                    @break
                    @default
                    <span class="service-tag">{{ ucfirst(str_replace('-', ' ', $contact->service)) }}</span>
                    @endswitch
                </span>
            </div>
            @endif

            @if($contact->budget)
            <div class="info-row">
                <span class="label">Budget:</span>
                <span class="value">
                    @switch($contact->budget)
                    @case('under-5k')
                    Under $5,000
                    @break
                    @case('5k-15k')
                    $5,000 - $15,000
                    @break
                    @case('15k-30k')
                    $15,000 - $30,000
                    @break
                    @case('30k-50k')
                    $30,000 - $50,000
                    @break
                    @case('over-50k')
                    Over $50,000
                    @break
                    @case('discuss')
                    Let's Discuss
                    @break
                    @default
                    {{ ucfirst(str_replace('-', ' ', $contact->budget)) }}
                    @endswitch
                </span>
            </div>
            @endif

            @if($contact->timeline)
            <div class="info-row">
                <span class="label">Timeline:</span>
                <span class="value">
                    @switch($contact->timeline)
                    @case('asap')
                    ASAP <span class="priority">HIGH PRIORITY</span>
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

            <div class="info-row">
                <span class="label">Submitted:</span>
                <span class="value timestamp">{{ $contact->created_at->format('M j, Y \a\t g:i A T') }}</span>
            </div>
        </div>

        <div class="contact-info">
            <h3>Message</h3>
            <div class="message-box">{{ $contact->message }}</div>
        </div>

        @if(isset($contact->metadata['ip_address']) || isset($contact->metadata['user_agent']))
        <div class="contact-info">
            <h3>Technical Information</h3>

            @if(isset($contact->metadata['ip_address']))
            <div class="info-row">
                <span class="label">IP Address:</span>
                <span class="value">{{ $contact->metadata['ip_address'] }}</span>
            </div>
            @endif

            @if(isset($contact->metadata['user_agent']))
            <div class="info-row">
                <span class="label">User Agent:</span>
                <span class="value" style="word-break: break-all;">{{ $contact->metadata['user_agent'] }}</span>
            </div>
            @endif

            @if(isset($contact->metadata['referer']))
            <div class="info-row">
                <span class="label">Referrer:</span>
                <span class="value">{{ $contact->metadata['referer'] }}</span>
            </div>
            @endif
        </div>
        @endif

        <p style="margin-top: 30px;">
            <strong>Next Steps:</strong><br>
            • Reply to this inquiry within 24 hours for best customer experience<br>
            • Check the admin dashboard for more details and to update the status<br>
            • Consider the budget and timeline when preparing your response
        </p>
    </div>

    <div class="footer">
        <p>This notification was sent automatically by {{ config('app.name') }} contact form.</p>
        <p>Contact ID: {{ $contact->id }}</p>
    </div>
</body>

</html>