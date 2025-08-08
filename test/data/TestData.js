// Helper functions for generating dynamic test data
export const TestDataHelpers = {
    // Generate random username
    generateRandomUsername: () => {
        const prefix = 'testuser';
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `${prefix}${timestamp}${random}`;
    },

    // Generate random email
    generateRandomEmail: () => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `test${timestamp}${random}@example.com`;
    },

    // Generate random password
    generateRandomPassword: () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    },

    // Get current timestamp
    getTimestamp: () => {
        return new Date().toISOString().replace(/[:.]/g, '-');
    },
};

export const TestData = {
    baseUrl: 'https://web-production-c47e.up.railway.app',
    loginUrl: '/login',
    registerUrl: '/register',
    productsUrl: '/products',

    loginPageTitle: 'Login',
    registerPageTitle: 'Register',
    productsPageTitle: 'All Consoles',

    validUser: {
        username: 'test',
        password: 'Qapass22!',
        email: 'test@example.com'
    },
    invalidUser: {
        username: 'invalidusername',
        password: 'invalidpassword',
        email: 'invalid@example.com'
    },

    errorMessages: {
        invalidCredentials: 'No active account found with the given credentials',
        usernameExists: 'Username already exists'
    },

    successMessages: {
        loginRedirect: 'Login successful! Redirecting...',
        registrationComplete: 'Registration successful!'
    },

    testUsers: {
        randomUser: {
            username: TestDataHelpers.generateRandomUsername(),
            email: TestDataHelpers.generateRandomEmail(),
            password: TestDataHelpers.generateRandomPassword(),
        },
        existingUser: {
            username: 'existinguser',
            email: 'existing@example.com',
            password: 'ExistingPass123!',
        }
    },

    products: {
        searchTerms: ['Sony PlayStation 2', 'Sega Dreamcast', 'Nintendo 64', 'Sega Saturn', 'nintendo'],
    },

    timeouts: {
        short: 1000,
        medium: 3000,
        long: 5000,
        elementWait: 10000,
        pageLoad: 30000
    },

    viewports: {
        mobile: { width: 375, height: 667 },
        tablet: { width: 768, height: 1024 },
        desktop: { width: 1920, height: 1080 }
    },

    browser: {
        windowSize: '1920,1080',
        headless: false,
        noSandbox: true,
        disableDevShmUsage: true,
        disableGpu: true
    },

    // Screenshot Settings
    screenshots: {
        directory: './test/screenshots',
        format: 'png',
        quality: 80
    },
};


