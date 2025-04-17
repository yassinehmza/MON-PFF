import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Briefcase, FileText, Bell, Calendar, Clock, ChevronRight, CheckCircle, PieChart, BarChart as BarChartIcon } from 'lucide-react';
import StagiaireNavigation from './StagiaireNavigation';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

function StagiaireLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <StagiaireNavigation />
      <main className="pl-64">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mx-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default StagiaireLayout;