from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from werkzeug.security import generate_password_hash, check_password_hash
import os
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173", "http://localhost:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

EXCEL_FILE = 'users.xlsx'

# Create Excel file if it doesn't exist
if not os.path.exists(EXCEL_FILE):
    df = pd.DataFrame(columns=['firstname', 'lastname', 'email', 'password', 'purpose', 'created_at'])
    df.to_excel(EXCEL_FILE, index=False)

def load_users():
    try:
        return pd.read_excel(EXCEL_FILE)
    except FileNotFoundError:
        return pd.DataFrame(columns=['firstname', 'lastname', 'email', 'password', 'purpose', 'created_at'])

def save_users(df):
    df.to_excel(EXCEL_FILE, index=False)

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        
        # Extract user data
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        email = data.get('email')
        password = data.get('password')
        purpose = data.get('purpose')
        
        # Validate required fields
        if not all([firstname, lastname, email, password, purpose]):
            return jsonify({'error': 'All fields are required'}), 400
        
        # Basic email validation
        if '@' not in email or '.' not in email:
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Load existing users
        users_df = load_users()
        
        # Check if email already exists
        if not users_df.empty and email in users_df['email'].values:
            return jsonify({'error': 'Email already registered'}), 400
        
        # Hash password
        hashed_password = generate_password_hash(password)
        
        # Create new user entry
        new_user = pd.DataFrame([[
            firstname, 
            lastname, 
            email, 
            hashed_password, 
            purpose,
            datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        ]], columns=['firstname', 'lastname', 'email', 'password', 'purpose', 'created_at'])
        
        # Add user to database
        users_df = pd.concat([users_df, new_user], ignore_index=True)
        save_users(users_df)
        
        return jsonify({'message': 'Registration successful'}), 201
        
    except Exception as e:
        print(f"Error during registration: {str(e)}")
        return jsonify({'error': 'An error occurred during registration'}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        users_df = load_users()
        
        # Check if user exists
        user = users_df[users_df['email'] == email]
        if user.empty:
            return jsonify({'error': 'User not found'}), 404
        
        # Validate password
        user_password_hash = user.iloc[0]['password']
        if not check_password_hash(user_password_hash, password):
            return jsonify({'error': 'Incorrect password'}), 401
        
        # Include user's first and last name in response
        user_data = {
            'firstname': user.iloc[0]['firstname'],
            'lastname': user.iloc[0]['lastname'],
            'email': user.iloc[0]['email']
        }
        
        return jsonify({'message': 'Login successful', 'user': user_data}), 200
        
    except Exception as e:
        print(f"Error during login: {str(e)}")
        return jsonify({'error': 'An error occurred during login'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)