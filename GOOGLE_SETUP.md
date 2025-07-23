# Google Sign-In Setup Guide for Kakitori

This guide will help you set up Google OAuth authentication for your Kakitori app.

## Prerequisites

1. Google Cloud Console account
2. Backend server running (KakitoriSVC)
3. Frontend development server running (KakitoriAPP)

## Step 1: Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (or Google Identity API)
4. Go to "Credentials" in the left sidebar
5. Click "Create Credentials" > "OAuth 2.0 Client ID"
6. Configure the OAuth consent screen if prompted
7. Select "Web application" as the application type
8. Add authorized JavaScript origins:
   - `http://localhost:5173` (for frontend)
   - `http://localhost:8000` (for backend)
9. Add authorized redirect URIs:
   - `http://localhost:5173/login`
   - `http://localhost:8000/api/v1/auth/google`
10. Copy the Client ID and Client Secret

## Step 2: Configure Backend Environment

1. Open `KakitoriSVC/.env`
2. Update the Google OAuth settings:
   ```
   GOOGLE_CLIENT_ID=your_actual_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_actual_google_client_secret_here
   ```

## Step 3: Configure Frontend Environment

1. Open `KakitoriAPP/.env`
2. Update the Google Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=your_actual_google_client_id_here
   ```

## Step 4: Start the Services

### Backend (KakitoriSVC)
```bash
cd KakitoriSVC
# Install dependencies if needed
pip install -r requirements.txt
# Start the development server
python -m uvicorn app.main:app --reload --port 8000
```

### Frontend (KakitoriAPP)
```bash
cd KakitoriAPP
# Install dependencies if needed
npm install
# Start the development server
npm run dev
```

## Step 5: Test the Login

1. Navigate to `http://localhost:5173`
2. You should be redirected to the login page
3. Click "Sign in with Google"
4. Complete the Google OAuth flow
5. You should be redirected to the dashboard and see your name displayed

## Features Implemented

✅ Google OAuth authentication
✅ User creation/login with Google account
✅ Protected routes (requires authentication)
✅ User data display on dashboard
✅ Logout functionality
✅ Persistent login (localStorage)

## API Endpoints Added

- `POST /api/v1/auth/google` - Google OAuth authentication
- `GET /api/v1/auth/me` - Get current user info
- `POST /api/v1/auth/refresh` - Refresh access token

## Database Changes

The user model already supports:
- `google_id` - Google user identifier
- `profile_picture` - URL to Google profile picture
- User profiles with learning preferences

## Troubleshooting

1. **CORS Issues**: Make sure your backend allows requests from your frontend URL
2. **Invalid Token**: Check that your Google Client ID is correct in both environments
3. **Database Errors**: Ensure your database is running and migrations are applied
4. **Import Errors**: Make sure all Python dependencies are installed

## Next Steps

- Set up production OAuth credentials for deployment
- Add email verification
- Implement refresh token rotation
- Add more OAuth providers (Facebook, GitHub, etc.)
- Add user profile editing
