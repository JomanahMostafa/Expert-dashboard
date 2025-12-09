# Quick Reference Guide - Expert Dashboard

## 🚀 Quick Start

```bash
cd expert-dashboard/dashboard
npm install
npm run dev
```

Visit: `http://localhost:3000`

---

## 📝 Demo Credentials

```
Email: demo@example.com
Password: Demo@12345
```

---

## 🔐 Authentication Quick Commands

### Login

```tsx
import { useAuth } from "@/hooks/use-auth";

const { login, isLoading, error } = useAuth();

await login("user@example.com", "password");
```

### Signup

```tsx
const { signup } = useAuth();

await signup("John Doe", "john@example.com", "SecurePass123");
```

### Check Auth Status

```tsx
const { isAuthenticated, user } = useAuth();

if (isAuthenticated) {
  console.log("User:", user.name);
}
```

### Logout

```tsx
const { logout } = useAuth();

logout();
```

---

## 🛡️ Protect a Page

```tsx
import { ProtectedLayout } from "@/components/ProtectedLayout";

export default function MyPage() {
  const content = <div>Protected content here</div>;
  return <ProtectedLayout>{content}</ProtectedLayout>;
}
```

---

## 🧪 Password Requirements for Signup

- ✅ At least 8 characters
- ✅ One uppercase letter (A-Z)
- ✅ One lowercase letter (a-z)
- ✅ One number (0-9)

**Example**: `MyPassword123` ✅ / `password` ❌

---

## 📍 Key Routes

| Route       | Type       | Auth Required |
| ----------- | ---------- | ------------- |
| `/`         | Dashboard  | Yes           |
| `/login`    | Login      | No            |
| `/signup`   | Signup     | No            |
| `/users`    | Users List | Yes           |
| `/payments` | Payments   | Yes           |

---

## 📦 API Endpoints

### Login

```
POST /api/auth/login
Body: { email, password }
Returns: { id, name, email, username, token }
```

### Signup

```
POST /api/auth/signup
Body: { name, email, password, confirmPassword }
Returns: { id, name, email, username, token }
```

### Get Users

```
GET /api/users
Returns: { data: User[], total, page, limit, hasMore }
```

### Get Payments

```
GET /api/payments
Returns: { data: Payment[], total, page, limit, hasMore }
```

---

## 🎨 Styling

### Tailwind Classes

```tsx
// Common patterns
className = "flex items-center justify-between";
className = "p-4 bg-white rounded-lg shadow";
className = "text-lg font-semibold text-foreground";
className = "hover:bg-accent transition";
```

### Theme Colors

```tsx
// Light/Dark themes
bg - background; // Page background
bg - foreground; // Text color
bg - muted; // Secondary text
bg - primary; // Brand color
bg - destructive; // Error/delete
```

---

## 🧩 Using Components

### Button

```tsx
import { Button } from "@/components/ui/button";

<Button>Click me</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button disabled>Disabled</Button>
<Button size="lg">Large</Button>
```

### Input

```tsx
import { Input } from "@/components/ui/input";

<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
```

### Alert

```tsx
import { Alert, AlertDescription } from "@/components/ui/alert";

<Alert variant="destructive">
  <AlertDescription>Error message</AlertDescription>
</Alert>;
```

### Form

```tsx
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";

<Form {...form}>
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
      </FormItem>
    )}
  />
</Form>;
```

---

## 📊 Data Hooks

### Async Hook

```tsx
import { useAsync } from "@/hooks/api/use-async";

const { data, loading, error } = useAsync(
  () => UserService.getUsers(),
  true // auto-execute
);
```

### Form Hook

```tsx
import { useModal } from "@/hooks/ui/use-form";

const { isOpen, open, close } = useModal();
```

---

## ✅ Validation

### Zod Schemas

```tsx
import { loginSchema, signupSchema } from "@/lib/validations/auth";

// Validate
const result = loginSchema.parse(data);

// Type-safe
type Login = z.infer<typeof loginSchema>;
```

### Using in Forms

```tsx
import { zodResolver } from "@hookform/resolvers/zod";

const form = useForm({
  resolver: zodResolver(loginSchema),
});
```

---

## 🔍 TypeScript Tips

### Type Inference

```tsx
// Good: Type automatically inferred
const { user } = useAuth();
// user is typed as AuthResponse | null

// Better: Explicit type
const user: AuthResponse | null = ...
```

### Generic Components

```tsx
// Type-safe table
interface TableColumn<T> {
  key: keyof T;
  header: string;
}

<DataTable<User> columns={columns} data={users} />;
```

---

## 🐛 Debugging

### Console Logging

```tsx
// Auth state
const { user, isAuthenticated } = useAuth();
console.log("User:", user);
console.log("Authenticated:", isAuthenticated);

// Form data
console.log("Form data:", form.watch());

// Error details
console.error("Error:", error);
```

### Browser DevTools

1. **Network Tab**: Check API calls
2. **Application Tab**: Check localStorage
3. **Console Tab**: Check logs
4. **React DevTools**: Inspect component state

---

## 📋 Checklist Before Deploy

- [ ] Run `npx tsc --noEmit` (0 errors)
- [ ] Run `npx eslint .` (0 errors)
- [ ] Test login with demo credentials
- [ ] Test signup with new email
- [ ] Test logout
- [ ] Test protected page redirect
- [ ] Check mobile responsiveness
- [ ] Check theme toggle works
- [ ] Check localStorage clearing on logout
- [ ] Environment variables configured

---

## 📚 Documentation

| Document                     | Purpose                |
| ---------------------------- | ---------------------- |
| AUTHENTICATION_GUIDE.md      | Auth system details    |
| FILE_STRUCTURE.md            | Project architecture   |
| PROJECT_STATUS.md            | Complete status report |
| TYPESCRIPT_LINTING_REPORT.md | Code quality metrics   |
| README.md                    | Getting started        |

---

## 🚨 Common Issues & Solutions

### Issue: "useAuth must be used within an AuthProvider"

**Solution**: Wrap your app with AuthProvider in layout.tsx

### Issue: Form validation not working

**Solution**: Ensure schema is passed to zodResolver correctly

### Issue: Protected page shows loading forever

**Solution**: Check browser console for errors, verify localStorage access

### Issue: Login/signup not working

**Solution**: Check API endpoints in Network tab, verify CORS headers

### Issue: TypeScript errors in components

**Solution**: Run `npx tsc --noEmit` to see all errors, check imports

---

## 💡 Best Practices

✅ **Do**

- Use TypeScript for type safety
- Validate all inputs with Zod
- Handle errors gracefully
- Use loading states
- Protect sensitive pages
- Log important events
- Document your code

❌ **Don't**

- Use `any` type (unless unavoidable)
- Store sensitive data in localStorage
- Skip validation
- Ignore errors
- Leave debugging code in production
- Hardcode URLs/credentials
- Skip testing critical flows

---

## 🎯 Next Steps

1. **Explore the Code**

   - Navigate through components
   - Read inline comments
   - Understand the architecture

2. **Make a Change**

   - Add a new component
   - Update a page
   - Modify styling

3. **Test Thoroughly**

   - Manual testing
   - Browser DevTools
   - Run type checking

4. **Deploy**
   - Set up production environment
   - Configure environment variables
   - Run final checks
   - Deploy to hosting

---

## 📞 Support

Need help? Check:

1. Documentation files
2. Code comments
3. Browser DevTools
4. Error messages
5. TypeScript errors

---

**Version**: 1.0.0  
**Last Updated**: December 2024
