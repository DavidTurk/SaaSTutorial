class ContactMailer < ActionMailer::Base
    default to: 'lordturk@gmail.com'

    def contact_email
        @name = name
        @email = email
        @body = body
        
        mail(from: email, subject: 'Contact Form Message')
    end
end