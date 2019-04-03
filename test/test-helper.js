import mongoose from 'mongoose';

afterEach(async() => {
    await mongoose.connection.collections.users.drop(async() => {
         //this function runs after the drop is complete
         console.log('users db dropped');
    });
    await mongoose.connection.collections.transactions.drop(async ()=> {
        console.log('transactions db dropped');
    });
    // await mongoose.connection.collections.transactioncalculations.drop(async ()=> {
    //     console.log('transaction calculations db dropped');
    // });
    
});

after(async() => {
    await process.exit(0);
})