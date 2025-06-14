import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Eye, Clock, Filter, Download } from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'unauthorized_access' | 'location_change' | 'camera_activation' | 'device_lock' | 'login_attempt';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  details?: Record<string, any>;
}

const SecurityLogs: React.FC = () => {
  const [logs, setLogs] = useState<SecurityEvent[]>([]);
  const [filter, setFilter] = useState<'all' | SecurityEvent['type']>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | SecurityEvent['severity']>('all');

  useEffect(() => {
    const sampleLogs: SecurityEvent[] = [
      {
        id: '1',
        type: 'unauthorized_access',
        severity: 'critical',
        message: 'Unauthorized access attempt detected',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        details: { attempts: 3, location: 'Unknown' }
      },
      {
        id: '2',
        type: 'camera_activation',
        severity: 'medium',
        message: 'Security camera activated automatically',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        details: { trigger: 'motion_detected' }
      },
      {
        id: '3',
        type: 'location_change',
        severity: 'low',
        message: 'Device location updated',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        details: { lat: 40.7128, lng: -74.0060 }
      },
      {
        id: '4',
        type: 'device_lock',
        severity: 'medium',
        message: 'Device locked remotely',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        details: { user: 'owner' }
      },
      {
        id: '5',
        type: 'login_attempt',
        severity: 'high',
        message: 'Failed login attempt from unknown device',
        timestamp: new Date(Date.now() - 1000 * 60 * 90),
        details: { ip: '192.168.1.100', userAgent: 'Unknown Browser' }
      }
    ];
    setLogs(sampleLogs);
  }, []);

  const getSeverityColor = (severity: SecurityEvent['severity']) => {
    switch (severity) {
      case 'low':
        return 'text-success-600 bg-success-50 border-success-200';
      case 'medium':
        return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'high':
        return 'text-error-600 bg-error-50 border-error-200';
      case 'critical':
        return 'text-red-700 bg-red-100 border-red-300';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: SecurityEvent['type']) => {
    switch (type) {
      case 'unauthorized_access':
        return <AlertTriangle className="h-5 w-5 text-error-600" />;
      case 'camera_activation':
        return <Eye className="h-5 w-5 text-primary-600" />;
      case 'location_change':
        return <Shield className="h-5 w-5 text-success-600" />;
      case 'device_lock':
        return <Shield className="h-5 w-5 text-warning-600" />;
      case 'login_attempt':
        return <AlertTriangle className="h-5 w-5 text-error-600" />;
      default:
        return <Shield className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: SecurityEvent['type']) => {
    switch (type) {
      case 'unauthorized_access':
        return 'Unauthorized Access';
      case 'camera_activation':
        return 'Camera Activation';
      case 'location_change':
        return 'Location Change';
      case 'device_lock':
        return 'Device Lock';
      case 'login_attempt':
        return 'Login Attempt';
      default:
        return 'Unknown';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const filteredLogs = logs.filter(log => {
    const typeMatch = filter === 'all' || log.type === filter;
    const severityMatch = severityFilter === 'all' || log.severity === severityFilter;
    return typeMatch && severityMatch;
  });

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'Type', 'Severity', 'Message', 'Details'].join(','),
      ...filteredLogs.map(log => [
        log.timestamp.toISOString(),
        log.type,
        log.severity,
        `"${log.message}"`,
        `"${JSON.stringify(log.details || {})}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `security-logs-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Security Logs</h2>
        <button
          onClick={exportLogs}
          className="btn btn-secondary flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Export Logs</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="input"
            >
              <option value="all">All Types</option>
              <option value="unauthorized_access">Unauthorized Access</option>
              <option value="camera_activation">Camera Activation</option>
              <option value="location_change">Location Change</option>
              <option value="device_lock">Device Lock</option>
              <option value="login_attempt">Login Attempt</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as any)}
              className="input"
            >
              <option value="all">All Severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-error-600">{logs.filter(l => l.severity === 'critical').length}</div>
          <div className="text-sm text-gray-600">Critical Events</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-error-500">{logs.filter(l => l.severity === 'high').length}</div>
          <div className="text-sm text-gray-600">High Priority</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-warning-600">{logs.filter(l => l.severity === 'medium').length}</div>
          <div className="text-sm text-gray-600">Medium Priority</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-success-600">{logs.filter(l => l.severity === 'low').length}</div>
          <div className="text-sm text-gray-600">Low Priority</div>
        </div>
      </div>

      {/* Logs List */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Recent Events</h3>
          <span className="text-sm text-gray-500">({filteredLogs.length} events)</span>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <div key={log.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getTypeIcon(log.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{getTypeLabel(log.type)}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(log.severity)}`}>
                          {log.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{log.message}</p>
                      {log.details && (
                        <div className="text-sm text-gray-500">
                          <strong>Details:</strong> {JSON.stringify(log.details, null, 2)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 ml-4">
                    <div>{formatTimestamp(log.timestamp)}</div>
                    <div className="text-xs">{log.timestamp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">No security events match your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityLogs;