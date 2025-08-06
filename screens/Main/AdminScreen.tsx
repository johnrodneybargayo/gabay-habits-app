import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, RefreshControl, Modal } from 'react-native';
import DashboardHeader from '../../components/DashboardHeader';
import { getFirebaseAuth, getFirebaseDatabase } from '../../firebase/firebase';
import { ref, get, set, push, remove } from 'firebase/database';

const AdminScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [issues, setIssues] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    systemHealth: {
      uptime: '99.9%',
      apiResponse: '120ms',
      errorRate: '0.1%',
      openIssues: 0
    }
  });
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [pomodoroTips, setPomodoroTips] = useState<string[]>([]);
  const [newTip, setNewTip] = useState('');
  const [editingTipIndex, setEditingTipIndex] = useState<number | null>(null);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const db = getFirebaseDatabase();
      
      // Load users
      const usersRef = ref(db, 'users');
      const usersSnapshot = await get(usersRef);
      if (usersSnapshot.exists()) {
        const usersData = Object.entries(usersSnapshot.val()).map(([id, data]: [string, any]) => ({
          id,
          ...data,
          lastActive: data.lastActive || new Date().toISOString()
        }));
        setUsers(usersData);
        
        // Calculate stats
        const totalUsers = usersData.length;
        const activeUsers = usersData.filter(user => {
          const lastActive = new Date(user.lastActive);
          const daysSinceActive = (Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24);
          return daysSinceActive <= 7; // Active in last 7 days
        }).length;
        
        setStats(prev => ({
          ...prev,
          totalUsers,
          activeUsers
        }));
      }
      
      // Load issues/support tickets
      const issuesRef = ref(db, 'support_tickets');
      const issuesSnapshot = await get(issuesRef);
      if (issuesSnapshot.exists()) {
        const issuesData = Object.entries(issuesSnapshot.val()).map(([id, data]: [string, any]) => ({
          id,
          ...data
        }));
        setIssues(issuesData);
        
        const openIssues = issuesData.filter(issue => issue.status === 'open').length;
        setStats(prev => ({
          ...prev,
          systemHealth: {
            ...prev.systemHealth,
            openIssues
          }
        }));
      }
      
      // Load Pomodoro tips
      const tipsRef = ref(db, 'pomodoro_tips');
      const tipsSnapshot = await get(tipsRef);
      if (tipsSnapshot.exists()) {
        const tipsData = Object.values(tipsSnapshot.val()) as string[];
        setPomodoroTips(tipsData);
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAdminData();
    setRefreshing(false);
  };

  const handleUserAction = (action: string, user: any) => {
    setSelectedUser(user);
    setModalType(action);
    setShowModal(true);
  };

  const executeUserAction = async () => {
    if (!selectedUser) return;
    
    try {
      const db = getFirebaseDatabase();
      const userRef = ref(db, `users/${selectedUser.id}`);
      
      switch (modalType) {
        case 'suspend':
          await set(userRef, { ...selectedUser, status: 'suspended' });
          Alert.alert('Success', `User ${selectedUser.username} has been suspended.`);
          break;
        case 'activate':
          await set(userRef, { ...selectedUser, status: 'active' });
          Alert.alert('Success', `User ${selectedUser.username} has been activated.`);
          break;
        case 'delete':
          Alert.alert(
            'Confirm Deletion',
            `Are you sure you want to delete user ${selectedUser.username}? This action cannot be undone.`,
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                  await remove(userRef);
                  Alert.alert('Success', 'User has been deleted.');
                  loadAdminData();
                }
              }
            ]
          );
          break;
      }
      
      setShowModal(false);
      loadAdminData();
    } catch (error) {
      Alert.alert('Error', 'Failed to perform action. Please try again.');
    }
  };

  const sendAnnouncement = async () => {
    if (!newAnnouncement.trim()) {
      Alert.alert('Error', 'Please enter an announcement message.');
      return;
    }
    
    try {
      const db = getFirebaseDatabase();
      const announcementsRef = ref(db, 'announcements');
      await push(announcementsRef, {
        message: newAnnouncement,
        timestamp: new Date().toISOString(),
        author: 'Admin'
      });
      
      Alert.alert('Success', 'Announcement sent to all users!');
      setNewAnnouncement('');
      setShowModal(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to send announcement.');
    }
  };

  const addTip = async () => {
    if (!newTip.trim()) {
      Alert.alert('Error', 'Please enter a tip.');
      return;
    }
    
    try {
      const db = getFirebaseDatabase();
      const tipsRef = ref(db, 'pomodoro_tips');
      const updatedTips = [...pomodoroTips, newTip.trim()];
      await set(tipsRef, updatedTips);
      
      setPomodoroTips(updatedTips);
      setNewTip('');
      Alert.alert('Success', 'Tip added successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add tip. Please try again.');
    }
  };

  const editTip = async () => {
    if (!newTip.trim() || editingTipIndex === null) {
      Alert.alert('Error', 'Please enter a tip.');
      return;
    }
    
    try {
      const db = getFirebaseDatabase();
      const tipsRef = ref(db, 'pomodoro_tips');
      const updatedTips = [...pomodoroTips];
      updatedTips[editingTipIndex] = newTip.trim();
      await set(tipsRef, updatedTips);
      
      setPomodoroTips(updatedTips);
      setNewTip('');
      setEditingTipIndex(null);
      Alert.alert('Success', 'Tip updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update tip. Please try again.');
    }
  };

  const deleteTip = async (index: number) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this tip?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const db = getFirebaseDatabase();
              const tipsRef = ref(db, 'pomodoro_tips');
              const updatedTips = pomodoroTips.filter((_, i) => i !== index);
              await set(tipsRef, updatedTips);
              
              setPomodoroTips(updatedTips);
              Alert.alert('Success', 'Tip deleted successfully!');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete tip. Please try again.');
            }
          }
        }
      ]
    );
  };

  const startEditTip = (index: number) => {
    setEditingTipIndex(index);
    setNewTip(pomodoroTips[index]);
  };

  const cancelEditTip = () => {
    setEditingTipIndex(null);
    setNewTip('');
  };

  const resolveIssue = async (issueId: string) => {
    try {
      const db = getFirebaseDatabase();
      const issueRef = ref(db, `support_tickets/${issueId}`);
      const issue = issues.find(i => i.id === issueId);
      
      await set(issueRef, {
        ...issue,
        status: 'resolved',
        resolvedAt: new Date().toISOString()
      });
      
      Alert.alert('Success', 'Issue marked as resolved!');
      loadAdminData();
    } catch (error) {
      Alert.alert('Error', 'Failed to resolve issue.');
    }
  };

  const filteredUsers = users.filter(user => 
    user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredIssues = issues.filter(issue => 
    issue.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderOverview = () => (
    <View>
      {/* Stats Cards */}
      <View className="flex-row justify-between mt-4">
        <View className="bg-white rounded-xl p-4 w-[48%]">
          <Text className="text-gray-500 text-sm font-medium">Total Users</Text>
          <Text className="text-purple-600 text-3xl font-bold">{stats.totalUsers}</Text>
          <Text className="text-xs text-gray-400 mt-1">
            {stats.totalUsers > 0 ? `${Math.round((stats.activeUsers / stats.totalUsers) * 100)}% active` : 'No users yet'}
          </Text>
        </View>
        <View className="bg-white rounded-xl p-4 w-[48%]">
          <Text className="text-gray-500 text-sm font-medium">Active Users</Text>
          <Text className="text-green-600 text-3xl font-bold">{stats.activeUsers}</Text>
          <Text className="text-xs text-gray-400 mt-1">Last 7 days</Text>
        </View>
      </View>

      {/* System Health */}
      <View className="bg-white rounded-xl p-4 mt-4">
        <Text className="text-black font-semibold text-lg mb-3">System Health</Text>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Server Uptime</Text>
          <Text className="text-green-600 font-semibold">{stats.systemHealth.uptime}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">API Response</Text>
          <Text className="text-blue-600 font-semibold">{stats.systemHealth.apiResponse}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Error Rate</Text>
          <Text className="text-green-600 font-semibold">{stats.systemHealth.errorRate}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Open Issues</Text>
          <Text className={`font-semibold ${
            stats.systemHealth.openIssues > 0 ? 'text-red-600' : 'text-green-600'
          }`}>{stats.systemHealth.openIssues}</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="bg-white rounded-xl p-4 mt-4">
        <Text className="text-black font-semibold text-lg mb-3">Quick Actions</Text>
        <View className="flex-row justify-between">
          <TouchableOpacity 
            className="bg-blue-500 px-4 py-2 rounded-lg flex-1 mr-2"
            onPress={() => {
              setModalType('announcement');
              setShowModal(true);
            }}
          >
            <Text className="text-white text-center font-semibold">📢 Send Announcement</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-green-500 px-4 py-2 rounded-lg flex-1 ml-2"
            onPress={onRefresh}
          >
            <Text className="text-white text-center font-semibold">🔄 Refresh Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderUsers = () => (
    <View className="mt-4">
      {filteredUsers.length === 0 ? (
        <View className="bg-white rounded-xl p-8 items-center">
          <Text className="text-gray-500 text-lg">👥 No users found</Text>
          <Text className="text-gray-400 text-sm mt-2">Users will appear here once they register</Text>
        </View>
      ) : (
        filteredUsers.map((user) => (
          <View key={user.id} className="bg-white rounded-xl p-4 mb-3">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-black font-semibold text-lg">{user.username || 'Unknown User'}</Text>
                <Text className="text-gray-500 text-sm">{user.email || 'No email'}</Text>
                <Text className="text-gray-400 text-xs mt-1">
                  Points: {user.points || 0} | Status: {user.status || 'active'}
                </Text>
              </View>
              <View className="flex-row">
                <TouchableOpacity 
                  className="bg-yellow-500 px-3 py-1 rounded mr-2"
                  onPress={() => handleUserAction('suspend', user)}
                >
                  <Text className="text-white text-xs">Suspend</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="bg-red-500 px-3 py-1 rounded"
                  onPress={() => handleUserAction('delete', user)}
                >
                  <Text className="text-white text-xs">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      )}
    </View>
  );

  const renderSupport = () => (
    <View className="mt-4">
      {filteredIssues.length === 0 ? (
        <View className="bg-white rounded-xl p-8 items-center">
          <Text className="text-gray-500 text-lg">🎫 No support tickets</Text>
          <Text className="text-gray-400 text-sm mt-2">Support requests will appear here</Text>
        </View>
      ) : (
        filteredIssues.map((issue) => (
          <View key={issue.id} className="bg-white rounded-xl p-4 mb-3">
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-black font-semibold">{issue.title || 'Untitled Issue'}</Text>
                <Text className="text-gray-500 text-sm mt-1">{issue.description || 'No description'}</Text>
                <Text className="text-gray-400 text-xs mt-2">
                  From: {issue.userEmail || 'Unknown'} | {new Date(issue.timestamp || Date.now()).toLocaleDateString()}
                </Text>
              </View>
              <View className="items-end">
                <Text className={`px-2 py-1 rounded-full text-xs ${
                  issue.priority === 'high' ? 'bg-red-100 text-red-700' :
                  issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {issue.priority || 'low'}
                </Text>
                {issue.status !== 'resolved' && (
                  <TouchableOpacity 
                    className="bg-green-500 px-3 py-1 rounded mt-2"
                    onPress={() => resolveIssue(issue.id)}
                  >
                    <Text className="text-white text-xs">Resolve</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))
      )}
    </View>
  );

  const renderContent = () => (
    <View className="mt-4">
      <View className="bg-white rounded-xl p-4 mb-4">
        <Text className="text-black font-semibold text-lg mb-3">Content Management</Text>
        <TouchableOpacity 
          className="bg-blue-500 p-3 rounded-lg mb-3"
          onPress={() => {
            setModalType('announcement');
            setShowModal(true);
          }}
        >
          <Text className="text-white text-center font-semibold">📢 Create Announcement</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="bg-orange-500 p-3 rounded-lg mb-3"
          onPress={() => {
            setModalType('tips');
            setShowModal(true);
          }}
        >
          <Text className="text-white text-center font-semibold">💡 Manage Pomodoro Tips</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-purple-500 p-3 rounded-lg mb-3">
          <Text className="text-white text-center font-semibold">📚 Manage Study Materials</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-green-500 p-3 rounded-lg">
          <Text className="text-white text-center font-semibold">🎯 Update App Content</Text>
        </TouchableOpacity>
      </View>
      
      <View className="bg-white rounded-xl p-4">
        <Text className="text-black font-semibold text-lg mb-3">App Statistics</Text>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Total Study Sessions</Text>
          <Text className="text-blue-600 font-semibold">{Math.floor(Math.random() * 1000) + 500}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Flashcards Created</Text>
          <Text className="text-purple-600 font-semibold">{Math.floor(Math.random() * 5000) + 2000}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Notes Shared</Text>
          <Text className="text-green-600 font-semibold">{Math.floor(Math.random() * 800) + 300}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-[#1b2845]">
      <ScrollView 
        className="px-4 pt-8"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <DashboardHeader firstName="Admin" points={999} />

        {/* Tab Navigation */}
        <View className="flex-row bg-[#324065] rounded-xl overflow-hidden mt-4">
          {['Overview', 'Users', 'Support', 'Content'].map((tab) => (
            <TouchableOpacity 
              key={tab} 
              className={`flex-1 p-3 ${
                selectedTab === tab ? 'bg-[#4c5c85]' : ''
              }`}
              onPress={() => setSelectedTab(tab)}
            >
              <Text className={`text-center font-medium ${
                selectedTab === tab ? 'text-white' : 'text-gray-300'
              }`}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search Box */}
        <TextInput
          placeholder={`Search ${selectedTab.toLowerCase()}...`}
          className="bg-white mt-4 p-3 rounded-xl text-sm text-black"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Tab Content */}
        {selectedTab === 'Overview' && renderOverview()}
        {selectedTab === 'Users' && renderUsers()}
        {selectedTab === 'Support' && renderSupport()}
        {selectedTab === 'Content' && renderContent()}

        <View className="h-20" />
      </ScrollView>

      {/* Modal for Actions */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-xl p-6 w-4/5 max-w-md">
            {modalType === 'announcement' ? (
              <View>
                <Text className="text-black font-semibold text-lg mb-4">Send Announcement</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3 mb-4 text-black"
                  placeholder="Enter announcement message..."
                  multiline
                  numberOfLines={4}
                  value={newAnnouncement}
                  onChangeText={setNewAnnouncement}
                />
                <View className="flex-row justify-end">
                  <TouchableOpacity 
                    className="bg-gray-500 px-4 py-2 rounded-lg mr-2"
                    onPress={() => setShowModal(false)}
                  >
                    <Text className="text-white">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="bg-blue-500 px-4 py-2 rounded-lg"
                    onPress={sendAnnouncement}
                  >
                    <Text className="text-white">Send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : modalType === 'tips' ? (
              <View>
                <Text className="text-black font-semibold text-lg mb-4">Manage Pomodoro Tips</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3 mb-4 text-black"
                  placeholder="Enter tip..."
                  multiline
                  numberOfLines={3}
                  value={newTip}
                  onChangeText={setNewTip}
                />
                <View className="flex-row justify-end mb-4">
                  {editingTipIndex !== null && (
                    <TouchableOpacity 
                      className="bg-gray-500 px-4 py-2 rounded-lg mr-2"
                      onPress={cancelEditTip}
                    >
                      <Text className="text-white">Cancel Edit</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity 
                    className="bg-green-500 px-4 py-2 rounded-lg mr-2"
                    onPress={editingTipIndex !== null ? editTip : addTip}
                  >
                    <Text className="text-white">{editingTipIndex !== null ? 'Update' : 'Add'} Tip</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView className="max-h-60 mb-4">
                  {pomodoroTips.map((tip, index) => (
                    <View key={index} className="border border-gray-200 rounded-lg p-3 mb-2">
                      <Text className="text-black mb-2">{tip}</Text>
                      <View className="flex-row justify-end">
                        <TouchableOpacity 
                          className="bg-blue-500 px-3 py-1 rounded mr-2"
                          onPress={() => startEditTip(index)}
                        >
                          <Text className="text-white text-xs">Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          className="bg-red-500 px-3 py-1 rounded"
                          onPress={() => deleteTip(index)}
                        >
                          <Text className="text-white text-xs">Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </ScrollView>
                <TouchableOpacity 
                  className="bg-gray-500 px-4 py-2 rounded-lg"
                  onPress={() => {
                    setShowModal(false);
                    cancelEditTip();
                  }}
                >
                  <Text className="text-white text-center">Close</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text className="text-black font-semibold text-lg mb-4">
                  Confirm {modalType} for {selectedUser?.username}
                </Text>
                <Text className="text-gray-600 mb-4">
                  Are you sure you want to {modalType} this user?
                </Text>
                <View className="flex-row justify-end">
                  <TouchableOpacity 
                    className="bg-gray-500 px-4 py-2 rounded-lg mr-2"
                    onPress={() => setShowModal(false)}
                  >
                    <Text className="text-white">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="bg-red-500 px-4 py-2 rounded-lg"
                    onPress={executeUserAction}
                  >
                    <Text className="text-white">Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AdminScreen;
