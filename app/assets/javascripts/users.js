/* global $, Stripe */
//Document ready
$(document).on('turbolinks:load', function(){
    var theForm = $('#pro_form'),
        submitButton = $('#form-submit-btn');
    //Set Stripe public key
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
    //When user click form submit button 
    submitButton.click(function(event){
        //prevent default submission behavior
        event.preventDefault();
        submitButton.val("Processing").prop('disabled', true);
        
        //Collect credit card fields
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
        
        //Use Stripe to check for errors
        var error = false;
        
        if(!Stripe.card.validateCardNumber(ccNum)){
            error = true;
            alert('The credit card number appears to be invalid');
        }
        
       if(!Stripe.card.validateCVC(cvcNum)){
            error = true;
            alert('The CVC number appears to be invalid');
        }
        
        if(!Stripe.card.validateExpiry(expMonth, expYear)){
            error = true;
            alert('The expiration date appears to be invalid');
        }
        
        //send card information to stripe
        if(error) {
            submitButton.prop('disabled', false).val("Sign Up");
        } else {
            Stripe.createToken({
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear
            }, stripeResponseHandler);
        }
        
        return false;
    });
 
    //stripe returns card token
    function stripeResponseHandler(status, response) {
        var token = response.id
    
        //inject card token as hidden field into form
        theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
        //submit form to rails
        theForm.get(0).submit();
    }
});