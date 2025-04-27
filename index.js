import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import salaryRouter from './routes/salary.js';
import leaveRouter from './routes/leave.js';
import settingRouter from './routes/setting.js';
import dashboardRouter from './routes/dashboard.js';
import connectToDatabase from './db/db.js';
import { userRegister } from './userSeed.js';

const startServer = async () => {
  try {
    console.log('Starting server...');
    await connectToDatabase();
    console.log('Database connection established');
    await userRegister();
    console.log('userRegister executed');

    const app = express();
    app.use(
      cors({
        origin: 'https://employee-ms-frontend-eta.vercel.app',
        credentials: true,
      })
    );
    app.use(express.json());
    app.use(express.static('public/uploads'));
    app.use('/api/auth', authRouter);
    app.use('/api/department', departmentRouter);
    app.use('/api/employee', employeeRouter);
    app.use('/api/salary', salaryRouter);
    app.use('/api/leave', leaveRouter);
    app.use('/api/setting', settingRouter);
    app.use('/api/dashboard', dashboardRouter);

    app.get('/', (req, res) => {
      res.send('🚀 Employee Management System Backend is Running!');
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Server startup error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
  }
};

startServer();