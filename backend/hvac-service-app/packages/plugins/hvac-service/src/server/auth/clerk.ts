import { AuthConfig } from '@nocobase/auth';
import { Context } from '@nocobase/actions';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

export default {
  type: 'clerk',
  
  // Authenticate user with Clerk
  authenticate: async (ctx: Context, next) => {
    // This middleware will add a user property to the request object if the request has a valid session
    const clerkMiddleware = ClerkExpressWithAuth({
      // Clerk API key from environment variables
      apiKey: process.env.CLERK_API_KEY,
    });

    // Call the Clerk middleware
    await new Promise((resolve) => {
      clerkMiddleware(ctx.req, ctx.res, resolve);
    });

    // If Clerk authenticated the user, get the user from the database or create a new one
    if (ctx.req.auth?.userId) {
      const { userId, sessionId } = ctx.req.auth;
      
      // Find user in the database by clerk user ID
      let user = await ctx.db.getRepository('users').findOne({
        filter: {
          'options.clerkId': userId,
        },
      });

      // If user doesn't exist, create a new one
      if (!user) {
        // Get user details from Clerk
        const clerkUser = await ctx.req.auth.user;
        
        // Create a new user in the database
        user = await ctx.db.getRepository('users').create({
          values: {
            nickname: clerkUser.firstName + ' ' + clerkUser.lastName,
            email: clerkUser.emailAddresses[0]?.emailAddress,
            options: {
              clerkId: userId,
            },
          },
        });
      }

      // Set the authenticated user in the context
      ctx.state.currentUser = user;
      await next();
    } else {
      // No authenticated user
      ctx.state.currentUser = null;
      await next();
    }
  },
  
  // Get the current user
  getUserFromToken: async (ctx, token, options) => {
    // This method is not used with Clerk, as Clerk handles token validation
    return null;
  },
} as AuthConfig;