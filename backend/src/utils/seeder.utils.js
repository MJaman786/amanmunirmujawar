import mongoose from 'mongoose';
import envConfig from '../config/env.config.js';
import { User } from '../modules/auth/auth.modal.js';

const runStandaloneSeeder = async () => {
    try {
        console.log('🔄 Connecting standalone instance to MongoDB...');
        await mongoose.connect(envConfig.MONGO_URI);
        console.log('✅ Connection established securely.');

        console.log('🔄 WARNING: Initiating global database cleanup pipeline...');

        // Dynamically fetch every collection currently inside the MongoDB database instance
        const collections = await mongoose.connection.db.collections();

        for (const collection of collections) {
            // Clears records while leaving indexing schema structures intact
            await collection.deleteMany({});
            console.log(`   🗑️ Wiped all records from collection: "${collection.collectionName}"`);
        }

        console.log('✨ All existing and future collection tables cleared. Seeding demo accounts...');

        const demoAccounts = [
            {
                name: 'Demo Admin', email: 'admin@demo.com', password: 'Password@123',
                role: 'ADMIN', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Aman Mujawar', email: 'amanmujawar064@gmail.com', password: 'Aman@1234',
                role: 'ADMIN', isEmailVerified: true, emailVerifiedAt: new Date()

            },
            {
                name: 'Demo User', email: 'user@demo.com', password: 'Password@123',
                role: 'USER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Demo Reseller', email: 'reseller@demo.com', password: 'Password@123',
                role: 'RESELLER', isEmailVerified: true, emailVerifiedAt: new Date()

            },
            {
                name: 'Demo Company', email: 'company@demo.com', password: 'Password@123',
                role: 'COMPANY', isEmailVerified: true, emailVerifiedAt: new Date()

            },
            {
                name: 'Aarav Sharma', email: 'aarav.sharma@example.com', password: 'Password@123',
                role: 'USER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Priya Mehta', email: 'priya.mehta@example.com', password: 'Password@123',
                role: 'USER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Rohan Verma', email: 'rohan.verma@example.com', password: 'Password@123',
                role: 'USER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Sneha Patil', email: 'sneha.patil@example.com', password: 'Password@123',
                role: 'USER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Aditya Kulkarni', email: 'aditya.kulkarni@example.com', password: 'Password@123',
                role: 'USER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Neha Joshi', email: 'neha.joshi@example.com', password: 'Password@123',
                role: 'USER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Karan Singh', email: 'karan.singh@example.com', password: 'Password@123',
                role: 'USER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Ananya Desai', email: 'ananya.desai@example.com', password: 'Password@123',
                role: 'USER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Rahul Nair', email: 'rahul.nair@example.com', password: 'Password@123',
                role: 'USER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Isha Kapoor', email: 'isha.kapoor@example.com', password: 'Password@123',
                role: 'USER', isEmailVerified: true, emailVerifiedAt: new Date()
            },

            {
                name: 'Prime Tech Solutions', email: 'contact@primetech.com', password: 'Password@123',
                role: 'RESELLER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Skyline Distributors', email: 'sales@skylinedist.com', password: 'Password@123',
                role: 'RESELLER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Vertex Supplies', email: 'info@vertexsupplies.com', password: 'Password@123',
                role: 'RESELLER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'BluePeak Traders', email: 'support@bluepeak.com', password: 'Password@123',
                role: 'RESELLER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'NextGen Distribution', email: 'admin@nextgendist.com', password: 'Password@123',
                role: 'RESELLER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Elite Wholesale Hub', email: 'hello@elitewholesale.com', password: 'Password@123',
                role: 'RESELLER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Global Trade Partners', email: 'team@globaltrade.com', password: 'Password@123',
                role: 'RESELLER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Rapid Supply Chain', email: 'contact@rapidsupply.com', password: 'Password@123',
                role: 'RESELLER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Urban Market Connect', email: 'office@urbanmarket.com', password: 'Password@123',
                role: 'RESELLER', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Infinity Distribution', email: 'support@infinitydist.com', password: 'Password@123',
                role: 'RESELLER', isEmailVerified: true, emailVerifiedAt: new Date()
            },

            {
                name: 'TechNova Pvt Ltd', email: 'admin@technova.com', password: 'Password@123',
                role: 'COMPANY', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Innovix Solutions', email: 'contact@innovix.com', password: 'Password@123',
                role: 'COMPANY', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'BrightCore Technologies', email: 'hello@brightcore.com', password: 'Password@123',
                role: 'COMPANY', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Zenith Software', email: 'info@zenithsoft.com', password: 'Password@123',
                role: 'COMPANY', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'FutureLink Systems', email: 'admin@futurelink.com', password: 'Password@123',
                role: 'COMPANY', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'CloudEdge Technologies', email: 'support@cloudedge.com', password: 'Password@123',
                role: 'COMPANY', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'ByteFusion Labs', email: 'contact@bytefusion.com', password: 'Password@123',
                role: 'COMPANY', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'CodeSphere Pvt Ltd', email: 'hello@codesphere.com', password: 'Password@123',
                role: 'COMPANY', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Nexa Digital', email: 'team@nexadigital.com', password: 'Password@123',
                role: 'COMPANY', isEmailVerified: true, emailVerifiedAt: new Date()
            },
            {
                name: 'Quantum Infosystems', email: 'admin@quantuminfo.com', password: 'Password@123',
                role: 'COMPANY', isEmailVerified: true, emailVerifiedAt: new Date()
            },
        ];

        for (const account of demoAccounts) {
            // User schema pre-save hook will automatically hash the passwords
            await User.create(account);
            console.log(`   ... Seeded fresh user: [${account.role}] -> ${account.email}`);
        }

        console.log('🏁 Global database seeding operation completed successfully.');
        process.exit(0); // Exit process with success status code
    } catch (error) {
        console.error('❌ Critical failure running dynamic standalone database seeder:', error);
        process.exit(1); // Exit process with failure status code
    }
};

// Fire execution pipeline
runStandaloneSeeder();