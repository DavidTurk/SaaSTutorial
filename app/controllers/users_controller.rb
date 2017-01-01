class UsersController < ApplicationController
   before_action :authenticate_user!
   
   # GET to /users/
   def index
      
   end
   
   # GET to /users/:user_id/
   def show
      @user = User.find( params[:id] )
   end
end