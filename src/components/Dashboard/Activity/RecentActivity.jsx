import React, { useState } from 'react';
import { FaUserMd, FaPrescription, FaFlask, FaCalendarCheck, FaNotesMedical } from 'react-icons/fa';
import ActivityItem from './ActivityItem';
import ActivityModal from './ActivityModal';

function RecentActivity() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activities] = useState([
    {
      id: 1,
      type: 'appointment',
      patient: 'John Doe',
      action: 'completed checkup',
      time: '2 hours ago',
      icon: FaUserMd,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      type: 'prescription',
      patient: 'Jane Smith',
      action: 'prescribed medication',
      time: '3 hours ago',
      icon: FaPrescription,
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    },
    {
      id: 3,
      type: 'lab',
      patient: 'Robert Johnson',
      action: 'requested blood test',
      time: '5 hours ago',
      icon: FaFlask,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    },
    {
      id: 4,
      type: 'appointment',
      patient: 'Sarah Williams',
      action: 'scheduled follow-up',
      time: '6 hours ago',
      icon: FaCalendarCheck,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100'
    },
    {
      id: 5,
      type: 'medical_record',
      patient: 'Michael Brown',
      action: 'updated medical history',
      time: '8 hours ago',
      icon: FaNotesMedical,
      color: 'text-red-500',
      bgColor: 'bg-red-100'
    }
  ]);

  const recentActivities = activities.slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
      <div className="space-y-6">
        {recentActivities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full mt-6 text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors flex items-center justify-center space-x-1"
      >
        <span>View All Activity</span>
        <span>→</span>
      </button>

      <ActivityModal
        activities={activities}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default RecentActivity;