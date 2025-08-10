# 🔐 Security Documentation

## Overview

This document outlines security practices, secret management, and incident response procedures for the GabayHabits application.

---

## 🔑 Secrets Inventory

### Required Secrets

| Secret | Purpose | Storage Location | Rotation Cadence | Owner |
|--------|---------|------------------|------------------|-------|
| `FIREBASE_API_KEY` | Firebase authentication | `.env` (local), Environment variables (production) | Every 90 days | DevOps Team |
| `FIREBASE_PROJECT_ID` | Firebase project identifier | `.env` (local), Environment variables (production) | When project changes | DevOps Team |
| `FIREBASE_AUTH_DOMAIN` | Firebase authentication domain | `.env` (local), Environment variables (production) | When project changes | DevOps Team |
| `FIREBASE_DATABASE_URL` | Firebase Realtime Database URL | `.env` (local), Environment variables (production) | When project changes | DevOps Team |
| `FIREBASE_STORAGE_BUCKET` | Firebase Storage bucket | `.env` (local), Environment variables (production) | When project changes | DevOps Team |
| `FIREBASE_MESSAGING_SENDER_ID` | Firebase Cloud Messaging | `.env` (local), Environment variables (production) | Every 90 days | DevOps Team |
| `FIREBASE_APP_ID` | Firebase app identifier | `.env` (local), Environment variables (production) | When project changes | DevOps Team |
| `FIREBASE_MEASUREMENT_ID` | Google Analytics measurement | `.env` (local), Environment variables (production) | Every 90 days | DevOps Team |
| `GOOGLE_WEB_CLIENT_ID` | Google OAuth authentication | `.env` (local), Environment variables (production) | Every 90 days | DevOps Team |

### Optional Secrets

| Secret | Purpose | Storage Location | Rotation Cadence | Owner |
|--------|---------|------------------|------------------|-------|
| `OPENAI_API_KEY` | AI chat functionality | `.env` (local), Environment variables (production) | Every 60 days | AI Team |
| `EXPO_PUBLIC_OPENAI_API_KEY` | Public OpenAI key for web | `.env` (local), Environment variables (production) | Every 60 days | AI Team |

---

## 🚨 Incident Playbook: Key Rotation

### When to Rotate Keys

- **Immediate rotation required:**
  - Keys accidentally committed to version control
  - Suspected key compromise
  - Team member with key access leaves
  - Security breach detected

- **Scheduled rotation:**
  - Firebase keys: Every 90 days
  - OpenAI keys: Every 60 days
  - Google OAuth: Every 90 days

### Step-by-Step Rotation Process

#### 1. Firebase Keys Rotation

1. **Generate new keys:**
   ```bash
   # Go to Firebase Console
   # Project Settings → General → Your apps
   # Click "Add app" or regenerate existing app config
   ```

2. **Update environment variables:**
   ```bash
   # Update .env file with new values
   cp .env .env.backup
   # Edit .env with new Firebase config
   ```

3. **Test new configuration:**
   ```bash
   # Clear cache and restart
   npx expo start --clear
   # Verify authentication works
   # Test database connectivity
   ```

4. **Deploy to production:**
   ```bash
   # Update production environment variables
   # Deploy new version
   # Monitor for errors
   ```

5. **Verify old keys are disabled:**
   - Check Firebase Console → Project Settings
   - Ensure old app configurations are removed
   - Monitor logs for authentication failures

#### 2. OpenAI API Key Rotation

1. **Generate new key:**
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create new API key
   - Copy the new key

2. **Update environment:**
   ```bash
   # Update both keys in .env
   OPENAI_API_KEY=sk-proj-new_key_here
   EXPO_PUBLIC_OPENAI_API_KEY=sk-proj-new_key_here
   ```

3. **Test AI functionality:**
   ```bash
   # Start app and test AI chat
   # Verify responses are working
   ```

4. **Revoke old key:**
   - Go back to OpenAI Platform
   - Delete the old API key
   - Monitor usage to ensure old key is not being used

#### 3. Google OAuth Key Rotation

1. **Generate new OAuth client:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - APIs & Services → Credentials
   - Create new OAuth 2.0 Client ID

2. **Update configuration:**
   ```bash
   # Update .env file
   GOOGLE_WEB_CLIENT_ID=new_client_id.apps.googleusercontent.com
   ```

3. **Test Google Sign-In:**
   ```bash
   # Test Google authentication flow
   # Verify user can sign in successfully
   ```

4. **Remove old OAuth client:**
   - Delete old OAuth client from Google Cloud Console
   - Monitor for authentication errors

### Verification Steps

#### ✅ Post-Rotation Checklist

- [ ] App starts successfully with new keys
- [ ] Firebase authentication works
- [ ] Database read/write operations work
- [ ] Google Sign-In functions properly
- [ ] AI chat responds correctly (if OpenAI keys rotated)
- [ ] Old keys have been revoked/disabled
- [ ] Production environment updated
- [ ] Team notified of key rotation
- [ ] Documentation updated with new rotation date

#### 🧪 Testing Scenarios

1. **Valid Environment Test:**
   ```bash
   # Start app with new valid keys
   npx expo start --clear
   # Expected: App starts normally, all features work
   ```

2. **Missing Environment Test:**
   ```bash
   # Temporarily rename .env file
   mv .env .env.temp
   npx expo start --clear
   # Expected: Clear error message about missing environment variables
   mv .env.temp .env
   ```

3. **Invalid Keys Test:**
   ```bash
   # Temporarily use old/invalid keys
   # Expected: Authentication failures, clear error messages
   ```

---

## 🛡️ Security Best Practices

### Environment Variable Security

1. **Never commit `.env` files:**
   - Always use `.env.example` for templates
   - Ensure `.env*` is in `.gitignore`
   - Use environment-specific files (`.env.development`, `.env.production`)

2. **Validate environment variables:**
   - App includes automatic validation on startup
   - Clear error messages for missing variables
   - Graceful degradation for optional variables

3. **Principle of least privilege:**
   - Only include necessary permissions in API keys
   - Use separate keys for different environments
   - Regularly audit key permissions

### Monitoring and Alerting

1. **Set up monitoring for:**
   - Authentication failures
   - API key usage spikes
   - Unusual access patterns
   - Failed environment validation

2. **Regular security reviews:**
   - Monthly key usage audits
   - Quarterly security assessments
   - Annual penetration testing

---

## 📞 Emergency Contacts

- **Security Team:** security@company.com
- **DevOps Team:** devops@company.com
- **On-call Engineer:** +1-XXX-XXX-XXXX

---

## 📝 Change Log

| Date | Change | Author |
|------|--------|--------|
| 2024-01-XX | Initial security documentation | Security Team |
| 2024-01-XX | Added environment validation | Development Team |

---

*Last updated: [Current Date]*
*Next review: [Date + 3 months]*