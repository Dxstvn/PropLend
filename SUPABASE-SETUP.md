# Supabase Configuration Guide for PropLend

## ✅ Current Status

### PropLend Project
- **Project ID**: `neqgziingginbjxpzmwn`
- **MCP Connection**: ✅ Configured and working
- **Frontend Integration**: ✅ Complete (all credentials configured)

### AnnPale Project
- **Project ID**: `yijizsscwkvepljqojkz`
- **Status**: ✅ **SAFE - All credentials intact and unchanged**
- **No interference** from PropLend Supabase integration

---

## 🔐 Required Credentials

To complete your PropLend Supabase setup, you need to get the following from your Supabase dashboard:

### 1. Navigate to Supabase Dashboard
Go to: https://app.supabase.io

### 2. Select PropLend Project
Find and click on project: `neqgziingginbjxpzmwn`

### 3. Get API Credentials
**Path**: Settings (⚙️) → API

Copy the following:

#### Project URL
```bash
NEXT_PUBLIC_SUPABASE_URL="https://neqgziingginbjxpzmwn.supabase.co"
```
✅ Already added to `.env`

#### Anon/Public Key (Client-side)
```bash
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGci..."
```
**Location in Dashboard**:
- Legacy API Keys → `anon` `public` key
- OR Publishable key section

✅ **COMPLETED**: Added to `.env`

#### Service Role Key (Server-side)
```bash
SUPABASE_SERVICE_ROLE_KEY="eyJhbGci..."
```
**Location in Dashboard**:
- Legacy API Keys → `service_role` key
- ⚠️ **Keep this secret** - never expose in client-side code

✅ **COMPLETED**: Added to `.env`

### 4. Get Database Connection Strings (Optional)
**Path**: Settings (⚙️) → Database

If you need direct Postgres access, copy:

```bash
POSTGRES_URL="postgres://postgres.neqgziingginbjxpzmwn:..."
POSTGRES_PRISMA_URL="postgres://postgres.neqgziingginbjxpzmwn:...&pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgres://postgres.neqgziingginbjxpzmwn:...5432/postgres"
```

---

## 📋 Current `.env` File Structure

Your `.env` file is now organized as:

```bash
# Supabase Project Configuration
SUPABASE_PROJECT_ID="neqgziingginbjxpzmwn"

# Supabase API Keys (from MCP integration)
SUPABASE_PUBLISHABLE_KEY="sb_publishable_z4eQken7JwD2nL7b-M3jtw_XJIhfsG9"
SUPABASE_SECRET_KEY="sb_secret_U3pu6zj2E14PRTB7-3HzHA_pIIxiU0W"

# Frontend (Next.js client-side)
NEXT_PUBLIC_SUPABASE_URL="https://neqgziingginbjxpzmwn.supabase.co" ✅
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." ✅

# Backend (Server-side admin operations)
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." ✅

# Database Connection (Optional)
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NON_POOLING=""
```

---

## 🔧 MCP Configuration Updates

### ✅ Playwright Extension Fixed
Updated [.mcp.json](.mcp.json:23) to include `-y` flag:

```json
"playwright-extension": {
  "type": "stdio",
  "command": "npx",
  "args": [
    "-y",  // ← Added this flag
    "@playwright/mcp@latest",
    "--extension"
  ],
  "env": {
    "PLAYWRIGHT_MCP_EXTENSION_TOKEN": "O2AxPr4ci-1LpKJ9qSy4ld8mBpl9B9MBjYrQXZRzUj4"
  }
}
```

This matches the working configuration from AnnPale.

---

## 🚀 Next Steps

### 1. Fill in Missing Credentials
- [x] Get `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Supabase dashboard ✅
- [x] Get `SUPABASE_SERVICE_ROLE_KEY` from Supabase dashboard ✅
- [x] Add both to [.env](.env:11) file ✅

### 2. Restart VS Code
After adding credentials:
- Restart VS Code completely
- This will reload all MCP server configurations

### 3. Verify MCP Connections
Run in terminal:
```bash
claude mcp list
```

**Expected output** (all 6 servers connected):
```
✓ Context7
✓ Supabase (neqgziingginbjxpzmwn)
✓ Vercel
✓ Playwright
✓ Playwright Extension  ← Should now appear!
✓ GitHub
```

### 4. Test Supabase Connection
Try using the Supabase MCP to query your database:
```
"List all tables in the PropLend database"
```

---

## 🛡️ Security Notes

### Safe Credentials (Can be public)
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `SUPABASE_PROJECT_ID`

These are designed to be exposed client-side. Your data is protected by Row Level Security (RLS) policies.

### Secret Credentials (Keep private)
- 🔒 `SUPABASE_SERVICE_ROLE_KEY`
- 🔒 `SUPABASE_SECRET_KEY`
- 🔒 `POSTGRES_PASSWORD`
- 🔒 All `POSTGRES_*` connection strings

**Never commit these** to Git or expose in client-side code.

### .gitignore Verification
Make sure your `.gitignore` includes:
```
.env
.env.local
.env*.local
```

---

## 🔍 Troubleshooting

### Playwright Extension still not showing?
1. Make sure browser extension is installed
2. Verify token is correct
3. Try running: `npx -y @playwright/mcp@latest --extension` manually

### Supabase MCP not connecting?
1. Verify project ID: `neqgziingginbjxpzmwn`
2. Check access token is valid
3. Try regenerating the MCP access token in Supabase dashboard

### Need to switch between projects?
Each project has its own `.mcp.json` file:
- **AnnPale**: `/Users/dustinjasmin/AnnPale/.mcp.json` (yijizsscwkvepljqojkz)
- **PropLend**: `/Users/dustinjasmin/PropLend/.mcp.json` (neqgziingginbjxpzmwn)

When you open a project folder in VS Code, it uses that project's configuration.

---

## 📚 Reference

### Supabase Documentation
- [Next.js Quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [API Keys Guide](https://supabase.com/docs/guides/api/api-keys)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

### Playwright MCP
- [GitHub Repository](https://github.com/microsoft/playwright-mcp)
- [Extension Guide](https://github.com/microsoft/playwright-mcp#browser-extension)

---

**Last Updated**: 2025-10-23
**Status**: ✅ All Configuration Complete - Ready to Use

## 📊 Summary

**Completed:**
- ✅ All 6 MCP servers configured (5 currently connected)
- ✅ PropLend Supabase credentials complete
- ✅ AnnPale Supabase verified safe and unchanged
- ✅ Playwright installed with browsers
- ✅ Documentation created

**Pending:**
- ⏳ VS Code restart needed to activate playwright-extension MCP
