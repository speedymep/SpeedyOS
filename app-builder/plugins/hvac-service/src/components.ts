import { Component, ComponentType } from '@speedyos/ui-builder';

/**
 * Dashboard Stats component
 */
export const DashboardStats = Component.container(
  'dashboard-stats',
  [
    Component.container(
      'dashboard-stats-row',
      [
        Component.card(
          'active-jobs-card',
          'Active Jobs',
          [
            Component.text('active-jobs-count', '24', {
              dataBinding: {
                source: 'dashboardStats',
                path: 'activeJobs',
              },
              styles: {
                fontSize: '2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#00B2FF',
              },
            }),
          ],
          {
            styles: {
              padding: '1rem',
              textAlign: 'center',
              backgroundColor: '#1E2A3A',
              borderRadius: '0.5rem',
            },
          }
        ),
        Component.card(
          'sms-response-card',
          'SMS Response Rate',
          [
            Component.text('sms-response-rate', '94%', {
              dataBinding: {
                source: 'dashboardStats',
                path: 'smsResponseRate',
              },
              styles: {
                fontSize: '2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#00E676',
              },
            }),
          ],
          {
            styles: {
              padding: '1rem',
              textAlign: 'center',
              backgroundColor: '#1E2A3A',
              borderRadius: '0.5rem',
            },
          }
        ),
        Component.card(
          'tech-utilization-card',
          'Tech Utilization',
          [
            Component.text('tech-utilization-rate', '87%', {
              dataBinding: {
                source: 'dashboardStats',
                path: 'techUtilization',
              },
              styles: {
                fontSize: '2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#FFA000',
              },
            }),
          ],
          {
            styles: {
              padding: '1rem',
              textAlign: 'center',
              backgroundColor: '#1E2A3A',
              borderRadius: '0.5rem',
            },
          }
        ),
        Component.card(
          'customer-satisfaction-card',
          'Customer Satisfaction',
          [
            Component.text('customer-satisfaction-rate', '4.8/5', {
              dataBinding: {
                source: 'dashboardStats',
                path: 'customerSatisfaction',
              },
              styles: {
                fontSize: '2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#00E5B8',
              },
            }),
          ],
          {
            styles: {
              padding: '1rem',
              textAlign: 'center',
              backgroundColor: '#1E2A3A',
              borderRadius: '0.5rem',
            },
          }
        ),
      ],
      {
        styles: {
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          marginBottom: '1.5rem',
        },
      }
    ),
  ],
  {
    styles: {
      padding: '1rem',
      backgroundColor: '#121926',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
    },
  }
);

/**
 * Ninja Communications component
 */
export const NinjaCommunications = Component.container(
  'ninja-communications',
  [
    Component.container(
      'ninja-communications-header',
      [
        Component.text('ninja-communications-title', 'Ninja Communications', {
          styles: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#FFFFFF',
          },
        }),
        Component.badge('unread-badge', '5 Unread', {
          styles: {
            backgroundColor: '#00E676',
            color: '#000000',
            padding: '0.25rem 0.5rem',
            borderRadius: '1rem',
            fontSize: '0.75rem',
            fontWeight: 'bold',
          },
        }),
      ],
      {
        styles: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        },
      }
    ),
    Component.container(
      'ninja-communications-messages',
      [
        Component.container(
          'message-john-smith',
          [
            Component.avatar('john-smith-avatar', 'JS', {
              styles: {
                backgroundColor: '#1E88E5',
                color: '#FFFFFF',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '0.75rem',
              },
            }),
            Component.container(
              'message-john-smith-content',
              [
                Component.text('john-smith-name', 'John Smith', {
                  styles: {
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    marginBottom: '0.25rem',
                  },
                }),
                Component.text('john-smith-message', 'When will Mike arrive?', {
                  styles: {
                    color: '#B0BEC5',
                    fontSize: '0.875rem',
                  },
                }),
              ],
              {
                styles: {
                  flex: 1,
                },
              }
            ),
            Component.text('john-smith-time', '2m ago', {
              styles: {
                color: '#607D8B',
                fontSize: '0.75rem',
              },
            }),
            Component.icon('john-smith-status', 'circle', {
              styles: {
                color: '#00E676',
                fontSize: '0.5rem',
                marginLeft: '0.5rem',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              backgroundColor: '#1E2A3A',
              marginBottom: '0.75rem',
            },
          }
        ),
        Component.container(
          'message-sarah-johnson',
          [
            Component.avatar('sarah-johnson-avatar', 'SJ', {
              styles: {
                backgroundColor: '#E91E63',
                color: '#FFFFFF',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '0.75rem',
              },
            }),
            Component.container(
              'message-sarah-johnson-content',
              [
                Component.text('sarah-johnson-name', 'Sarah Johnson', {
                  styles: {
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    marginBottom: '0.25rem',
                  },
                }),
                Component.text('sarah-johnson-message', 'Thanks for the quick service!', {
                  styles: {
                    color: '#B0BEC5',
                    fontSize: '0.875rem',
                  },
                }),
              ],
              {
                styles: {
                  flex: 1,
                },
              }
            ),
            Component.text('sarah-johnson-time', '15m ago', {
              styles: {
                color: '#607D8B',
                fontSize: '0.75rem',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              backgroundColor: '#1E2A3A',
              marginBottom: '0.75rem',
            },
          }
        ),
        Component.container(
          'message-mikes-restaurant',
          [
            Component.avatar('mikes-restaurant-avatar', 'MR', {
              styles: {
                backgroundColor: '#FF9800',
                color: '#FFFFFF',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '0.75rem',
              },
            }),
            Component.container(
              'message-mikes-restaurant-content',
              [
                Component.text('mikes-restaurant-name', 'Mike\'s Restaurant', {
                  styles: {
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    marginBottom: '0.25rem',
                  },
                }),
                Component.text('mikes-restaurant-message', 'Emergency AC failure', {
                  styles: {
                    color: '#B0BEC5',
                    fontSize: '0.875rem',
                  },
                }),
              ],
              {
                styles: {
                  flex: 1,
                },
              }
            ),
            Component.text('mikes-restaurant-time', '1h ago', {
              styles: {
                color: '#607D8B',
                fontSize: '0.75rem',
              },
            }),
            Component.icon('mikes-restaurant-status', 'circle', {
              styles: {
                color: '#00E676',
                fontSize: '0.5rem',
                marginLeft: '0.5rem',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              backgroundColor: '#1E2A3A',
              marginBottom: '0.75rem',
            },
          }
        ),
      ],
      {
        styles: {
          marginBottom: '1rem',
        },
      }
    ),
  ],
  {
    styles: {
      padding: '1rem',
      backgroundColor: '#121926',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
    },
  }
);

/**
 * Active Work Orders component
 */
export const ActiveWorkOrders = Component.container(
  'active-work-orders',
  [
    Component.container(
      'active-work-orders-header',
      [
        Component.text('active-work-orders-title', 'Active Work Orders', {
          styles: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#FFFFFF',
          },
        }),
        Component.button('new-order-button', 'New Order', {
          props: {
            onClick: 'createNewWorkOrder',
            variant: 'primary',
          },
          styles: {
            backgroundColor: '#00B2FF',
            color: '#FFFFFF',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
          },
        }),
      ],
      {
        styles: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        },
      }
    ),
    Component.container(
      'work-order-1234',
      [
        Component.container(
          'work-order-1234-header',
          [
            Component.text('work-order-1234-number', '#1234', {
              styles: {
                color: '#00B2FF',
                fontWeight: 'bold',
              },
            }),
            Component.badge('work-order-1234-priority', 'High', {
              styles: {
                backgroundColor: '#FF3D00',
                color: '#FFFFFF',
                padding: '0.25rem 0.5rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: 'bold',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
            },
          }
        ),
        Component.text('work-order-1234-customer', 'John Smith', {
          styles: {
            color: '#FFFFFF',
            fontWeight: 'bold',
            marginBottom: '0.25rem',
          },
        }),
        Component.text('work-order-1234-service', 'AC Repair', {
          styles: {
            color: '#B0BEC5',
            fontSize: '0.875rem',
            marginBottom: '0.25rem',
          },
        }),
        Component.text('work-order-1234-status', 'On Site', {
          styles: {
            color: '#B0BEC5',
            fontSize: '0.875rem',
          },
        }),
        Component.icon('work-order-1234-actions', 'more-vertical', {
          props: {
            onClick: 'showWorkOrderActions',
          },
          styles: {
            color: '#607D8B',
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          },
        }),
      ],
      {
        styles: {
          position: 'relative',
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: '#1E2A3A',
          marginBottom: '0.75rem',
        },
      }
    ),
    Component.container(
      'work-order-1235',
      [
        Component.container(
          'work-order-1235-header',
          [
            Component.text('work-order-1235-number', '#1235', {
              styles: {
                color: '#00B2FF',
                fontWeight: 'bold',
              },
            }),
            Component.badge('work-order-1235-priority', 'Medium', {
              styles: {
                backgroundColor: '#FFA000',
                color: '#FFFFFF',
                padding: '0.25rem 0.5rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: 'bold',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
            },
          }
        ),
        Component.text('work-order-1235-customer', 'Sarah Johnson', {
          styles: {
            color: '#FFFFFF',
            fontWeight: 'bold',
            marginBottom: '0.25rem',
          },
        }),
        Component.text('work-order-1235-service', 'Heating Service', {
          styles: {
            color: '#B0BEC5',
            fontSize: '0.875rem',
            marginBottom: '0.25rem',
          },
        }),
        Component.text('work-order-1235-status', 'Scheduled', {
          styles: {
            color: '#B0BEC5',
            fontSize: '0.875rem',
          },
        }),
        Component.icon('work-order-1235-actions', 'more-vertical', {
          props: {
            onClick: 'showWorkOrderActions',
          },
          styles: {
            color: '#607D8B',
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          },
        }),
      ],
      {
        styles: {
          position: 'relative',
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: '#1E2A3A',
          marginBottom: '0.75rem',
        },
      }
    ),
    Component.container(
      'work-order-1236',
      [
        Component.container(
          'work-order-1236-header',
          [
            Component.text('work-order-1236-number', '#1236', {
              styles: {
                color: '#00B2FF',
                fontWeight: 'bold',
              },
            }),
            Component.badge('work-order-1236-priority', 'Low', {
              styles: {
                backgroundColor: '#00E676',
                color: '#000000',
                padding: '0.25rem 0.5rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: 'bold',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
            },
          }
        ),
        Component.text('work-order-1236-customer', 'Mike\'s Restaurant', {
          styles: {
            color: '#FFFFFF',
            fontWeight: 'bold',
            marginBottom: '0.25rem',
          },
        }),
        Component.text('work-order-1236-service', 'Maintenance', {
          styles: {
            color: '#B0BEC5',
            fontSize: '0.875rem',
            marginBottom: '0.25rem',
          },
        }),
        Component.text('work-order-1236-status', 'Pending', {
          styles: {
            color: '#B0BEC5',
            fontSize: '0.875rem',
          },
        }),
        Component.icon('work-order-1236-actions', 'more-vertical', {
          props: {
            onClick: 'showWorkOrderActions',
          },
          styles: {
            color: '#607D8B',
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          },
        }),
      ],
      {
        styles: {
          position: 'relative',
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: '#1E2A3A',
          marginBottom: '0.75rem',
        },
      }
    ),
  ],
  {
    styles: {
      padding: '1rem',
      backgroundColor: '#121926',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
    },
  }
);

/**
 * Team Status component
 */
export const TeamStatus = Component.container(
  'team-status',
  [
    Component.text('team-status-title', 'Team Status', {
      styles: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: '1rem',
      },
    }),
    Component.container(
      'technician-mike-johnson',
      [
        Component.container(
          'technician-mike-johnson-header',
          [
            Component.text('technician-mike-johnson-name', 'Mike Johnson', {
              styles: {
                color: '#FFFFFF',
                fontWeight: 'bold',
              },
            }),
            Component.badge('technician-mike-johnson-status', 'On Site', {
              styles: {
                backgroundColor: '#00B2FF',
                color: '#FFFFFF',
                padding: '0.25rem 0.5rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: 'bold',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
            },
          }
        ),
        Component.container(
          'technician-mike-johnson-location',
          [
            Component.icon('technician-mike-johnson-location-icon', 'map-pin', {
              styles: {
                color: '#607D8B',
                marginRight: '0.5rem',
              },
            }),
            Component.text('technician-mike-johnson-location-text', '123 Main St', {
              styles: {
                color: '#B0BEC5',
                fontSize: '0.875rem',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.25rem',
            },
          }
        ),
        Component.container(
          'technician-mike-johnson-job',
          [
            Component.icon('technician-mike-johnson-job-icon', 'clipboard', {
              styles: {
                color: '#607D8B',
                marginRight: '0.5rem',
              },
            }),
            Component.text('technician-mike-johnson-job-text', 'Job: #1234', {
              styles: {
                color: '#B0BEC5',
                fontSize: '0.875rem',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
            },
          }
        ),
      ],
      {
        styles: {
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: '#1E2A3A',
          marginBottom: '0.75rem',
        },
      }
    ),
    Component.container(
      'technician-lisa-chen',
      [
        Component.container(
          'technician-lisa-chen-header',
          [
            Component.text('technician-lisa-chen-name', 'Lisa Chen', {
              styles: {
                color: '#FFFFFF',
                fontWeight: 'bold',
              },
            }),
            Component.badge('technician-lisa-chen-status', 'Available', {
              styles: {
                backgroundColor: '#00E676',
                color: '#000000',
                padding: '0.25rem 0.5rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: 'bold',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
            },
          }
        ),
        Component.container(
          'technician-lisa-chen-location',
          [
            Component.icon('technician-lisa-chen-location-icon', 'map-pin', {
              styles: {
                color: '#607D8B',
                marginRight: '0.5rem',
              },
            }),
            Component.text('technician-lisa-chen-location-text', 'Office', {
              styles: {
                color: '#B0BEC5',
                fontSize: '0.875rem',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.25rem',
            },
          }
        ),
        Component.container(
          'technician-lisa-chen-job',
          [
            Component.icon('technician-lisa-chen-job-icon', 'clipboard', {
              styles: {
                color: '#607D8B',
                marginRight: '0.5rem',
              },
            }),
            Component.text('technician-lisa-chen-job-text', 'Job: None', {
              styles: {
                color: '#B0BEC5',
                fontSize: '0.875rem',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
            },
          }
        ),
      ],
      {
        styles: {
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: '#1E2A3A',
          marginBottom: '0.75rem',
        },
      }
    ),
    Component.container(
      'technician-tom-wilson',
      [
        Component.container(
          'technician-tom-wilson-header',
          [
            Component.text('technician-tom-wilson-name', 'Tom Wilson', {
              styles: {
                color: '#FFFFFF',
                fontWeight: 'bold',
              },
            }),
            Component.badge('technician-tom-wilson-status', 'En Route', {
              styles: {
                backgroundColor: '#00B2FF',
                color: '#FFFFFF',
                padding: '0.25rem 0.5rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: 'bold',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
            },
          }
        ),
        Component.container(
          'technician-tom-wilson-location',
          [
            Component.icon('technician-tom-wilson-location-icon', 'map-pin', {
              styles: {
                color: '#607D8B',
                marginRight: '0.5rem',
              },
            }),
            Component.text('technician-tom-wilson-location-text', '456 Oak Ave', {
              styles: {
                color: '#B0BEC5',
                fontSize: '0.875rem',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.25rem',
            },
          }
        ),
        Component.container(
          'technician-tom-wilson-job',
          [
            Component.icon('technician-tom-wilson-job-icon', 'clipboard', {
              styles: {
                color: '#607D8B',
                marginRight: '0.5rem',
              },
            }),
            Component.text('technician-tom-wilson-job-text', 'Job: #1235', {
              styles: {
                color: '#B0BEC5',
                fontSize: '0.875rem',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
            },
          }
        ),
      ],
      {
        styles: {
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: '#1E2A3A',
          marginBottom: '0.75rem',
        },
      }
    ),
  ],
  {
    styles: {
      padding: '1rem',
      backgroundColor: '#121926',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
    },
  }
);

/**
 * Quick Actions component
 */
export const QuickActions = Component.container(
  'quick-actions',
  [
    Component.text('quick-actions-title', 'Quick Actions', {
      styles: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: '1rem',
      },
    }),
    Component.button('create-work-order-button', 'Create Work Order', {
      props: {
        onClick: 'createWorkOrder',
        variant: 'primary',
        icon: 'plus',
      },
      styles: {
        backgroundColor: '#00E676',
        color: '#000000',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'center',
        marginBottom: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }),
    Component.button('send-mass-sms-button', 'Send Mass SMS', {
      props: {
        onClick: 'sendMassSMS',
        variant: 'secondary',
        icon: 'send',
      },
      styles: {
        backgroundColor: '#00B2FF',
        color: '#FFFFFF',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'center',
        marginBottom: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }),
    Component.button('emergency-dispatch-button', 'Emergency Dispatch', {
      props: {
        onClick: 'emergencyDispatch',
        variant: 'danger',
        icon: 'alert-circle',
      },
      styles: {
        backgroundColor: '#FF3D00',
        color: '#FFFFFF',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }),
  ],
  {
    styles: {
      padding: '1rem',
      backgroundColor: '#121926',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
    },
  }
);

/**
 * Workflow Designer component
 */
export const WorkflowDesigner = Component.container(
  'workflow-designer',
  [
    Component.text('workflow-designer-title', 'Workflow Designer', {
      styles: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: '1rem',
      },
    }),
    Component.container(
      'workflow-steps',
      [
        Component.container(
          'workflow-step-1',
          [
            Component.icon('workflow-step-1-icon', 'check-circle', {
              styles: {
                color: '#00E676',
                fontSize: '1.5rem',
              },
            }),
            Component.container(
              'workflow-step-1-line',
              [],
              {
                styles: {
                  height: '2px',
                  backgroundColor: '#00E676',
                  flex: 1,
                  margin: '0 0.5rem',
                },
              }
            ),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
            },
          }
        ),
        Component.container(
          'workflow-step-2',
          [
            Component.icon('workflow-step-2-icon', 'check-circle', {
              styles: {
                color: '#00E676',
                fontSize: '1.5rem',
              },
            }),
            Component.container(
              'workflow-step-2-line',
              [],
              {
                styles: {
                  height: '2px',
                  backgroundColor: '#00E676',
                  flex: 1,
                  margin: '0 0.5rem',
                },
              }
            ),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
            },
          }
        ),
        Component.container(
          'workflow-step-3',
          [
            Component.icon('workflow-step-3-icon', 'check-circle', {
              styles: {
                color: '#00E676',
                fontSize: '1.5rem',
              },
            }),
            Component.container(
              'workflow-step-3-line',
              [],
              {
                styles: {
                  height: '2px',
                  backgroundColor: '#00B2FF',
                  flex: 1,
                  margin: '0 0.5rem',
                },
              }
            ),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
            },
          }
        ),
        Component.container(
          'workflow-step-4',
          [
            Component.icon('workflow-step-4-icon', 'circle', {
              styles: {
                color: '#00B2FF',
                fontSize: '1.5rem',
              },
            }),
            Component.container(
              'workflow-step-4-line',
              [],
              {
                styles: {
                  height: '2px',
                  backgroundColor: '#607D8B',
                  flex: 1,
                  margin: '0 0.5rem',
                },
              }
            ),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
            },
          }
        ),
        Component.container(
          'workflow-step-5',
          [
            Component.icon('workflow-step-5-icon', 'circle', {
              styles: {
                color: '#607D8B',
                fontSize: '1.5rem',
              },
            }),
            Component.container(
              'workflow-step-5-line',
              [],
              {
                styles: {
                  height: '2px',
                  backgroundColor: '#607D8B',
                  flex: 1,
                  margin: '0 0.5rem',
                },
              }
            ),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
            },
          }
        ),
        Component.container(
          'workflow-step-6',
          [
            Component.icon('workflow-step-6-icon', 'circle', {
              styles: {
                color: '#607D8B',
                fontSize: '1.5rem',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
            },
          }
        ),
      ],
      {
        styles: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      }
    ),
  ],
  {
    styles: {
      padding: '1rem',
      backgroundColor: '#121926',
      borderRadius: '0.5rem',
    },
  }
);

/**
 * Work Order Form component
 */
export const WorkOrderForm = Component.form(
  'work-order-form',
  [
    Component.text('work-order-form-title', 'Create Work Order', {
      styles: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: '1.5rem',
      },
    }),
    Component.container(
      'work-order-form-customer-section',
      [
        Component.text('work-order-form-customer-title', 'Customer Information', {
          styles: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#FFFFFF',
            marginBottom: '1rem',
          },
        }),
        Component.select('work-order-customer', 'Customer', [
          { value: '1', label: 'John Smith' },
          { value: '2', label: 'Sarah Johnson' },
          { value: '3', label: 'Mike\'s Restaurant' },
        ], {
          props: {
            required: true,
            placeholder: 'Select a customer',
            onChange: 'handleCustomerChange',
          },
          styles: {
            marginBottom: '1rem',
          },
        }),
        Component.select('work-order-equipment', 'Equipment', [
          { value: '1', label: 'AC Unit - Carrier' },
          { value: '2', label: 'Furnace - Trane' },
          { value: '3', label: 'Heat Pump - Lennox' },
        ], {
          props: {
            required: true,
            placeholder: 'Select equipment',
          },
          styles: {
            marginBottom: '1rem',
          },
        }),
      ],
      {
        styles: {
          marginBottom: '1.5rem',
        },
      }
    ),
    Component.container(
      'work-order-form-service-section',
      [
        Component.text('work-order-form-service-title', 'Service Information', {
          styles: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#FFFFFF',
            marginBottom: '1rem',
          },
        }),
        Component.input('work-order-title', 'Title', {
          props: {
            required: true,
            placeholder: 'Enter work order title',
          },
          styles: {
            marginBottom: '1rem',
          },
        }),
        Component.textarea('work-order-description', 'Description', {
          props: {
            required: true,
            placeholder: 'Enter work order description',
            rows: 3,
          },
          styles: {
            marginBottom: '1rem',
          },
        }),
        Component.select('work-order-service-type', 'Service Type', [
          { value: 'repair', label: 'Repair' },
          { value: 'maintenance', label: 'Maintenance' },
          { value: 'installation', label: 'Installation' },
          { value: 'inspection', label: 'Inspection' },
        ], {
          props: {
            required: true,
            placeholder: 'Select service type',
          },
          styles: {
            marginBottom: '1rem',
          },
        }),
        Component.select('work-order-priority', 'Priority', [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'emergency', label: 'Emergency' },
        ], {
          props: {
            required: true,
            placeholder: 'Select priority',
          },
          styles: {
            marginBottom: '1rem',
          },
        }),
        Component.checkbox('work-order-emergency', 'This is an emergency', {
          props: {
            onChange: 'handleEmergencyChange',
          },
          styles: {
            marginBottom: '1rem',
          },
        }),
      ],
      {
        styles: {
          marginBottom: '1.5rem',
        },
      }
    ),
    Component.container(
      'work-order-form-scheduling-section',
      [
        Component.text('work-order-form-scheduling-title', 'Scheduling', {
          styles: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#FFFFFF',
            marginBottom: '1rem',
          },
        }),
        Component.datetime('work-order-scheduled-date', 'Scheduled Date', {
          props: {
            required: true,
            placeholder: 'Select date and time',
          },
          styles: {
            marginBottom: '1rem',
          },
        }),
        Component.select('work-order-technician', 'Assign Technician', [
          { value: '1', label: 'Mike Johnson' },
          { value: '2', label: 'Lisa Chen' },
          { value: '3', label: 'Tom Wilson' },
        ], {
          props: {
            placeholder: 'Select technician (optional)',
          },
          styles: {
            marginBottom: '1rem',
          },
        }),
        Component.input('work-order-estimated-hours', 'Estimated Hours', {
          props: {
            type: 'number',
            placeholder: 'Enter estimated hours',
            min: '0.5',
            step: '0.5',
          },
          styles: {
            marginBottom: '1rem',
          },
        }),
      ],
      {
        styles: {
          marginBottom: '1.5rem',
        },
      }
    ),
    Component.container(
      'work-order-form-buttons',
      [
        Component.button('work-order-submit', 'Create Work Order', {
          props: {
            type: 'submit',
            variant: 'primary',
          },
          styles: {
            backgroundColor: '#00E676',
            color: '#000000',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'center',
          },
        }),
      ],
      {
        styles: {
          marginTop: '1rem',
        },
      }
    ),
  ],
  {
    props: {
      onSubmit: 'handleWorkOrderSubmit',
    },
    styles: {
      padding: '1.5rem',
      backgroundColor: '#121926',
      borderRadius: '0.5rem',
    },
  }
);

/**
 * Technician Mobile View component
 */
export const TechnicianMobileView = Component.container(
  'technician-mobile-view',
  [
    Component.container(
      'technician-mobile-header',
      [
        Component.container(
          'technician-mobile-user',
          [
            Component.avatar('technician-mobile-avatar', 'MJ', {
              props: {
                src: 'https://randomuser.me/api/portraits/men/32.jpg',
              },
              styles: {
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                marginRight: '0.75rem',
              },
            }),
            Component.text('technician-mobile-name', 'Mike Johnson', {
              styles: {
                color: '#FFFFFF',
                fontWeight: 'bold',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
            },
          }
        ),
        Component.container(
          'technician-mobile-notifications',
          [
            Component.icon('technician-mobile-notification-icon', 'bell', {
              styles: {
                color: '#FFFFFF',
                fontSize: '1.25rem',
                position: 'relative',
              },
            }),
            Component.badge('technician-mobile-notification-badge', '1', {
              styles: {
                position: 'absolute',
                top: '-0.25rem',
                right: '-0.25rem',
                backgroundColor: '#FF3D00',
                color: '#FFFFFF',
                width: '1rem',
                height: '1rem',
                borderRadius: '50%',
                fontSize: '0.625rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }),
          ],
          {
            styles: {
              position: 'relative',
            },
          }
        ),
      ],
      {
        styles: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: '#121926',
          borderBottom: '1px solid #1E2A3A',
        },
      }
    ),
    Component.container(
      'technician-mobile-current-job',
      [
        Component.badge('technician-mobile-status', 'On Site', {
          styles: {
            backgroundColor: '#00B2FF',
            color: '#FFFFFF',
            padding: '0.25rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
          },
        }),
        Component.text('technician-mobile-elapsed', '1h 23m elapsed', {
          styles: {
            color: '#B0BEC5',
            fontSize: '0.875rem',
            marginBottom: '1rem',
          },
        }),
        Component.text('technician-mobile-job-title', 'AC Repair - John Smith', {
          styles: {
            color: '#FFFFFF',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
          },
        }),
        Component.progress('technician-mobile-progress', 70, {
          styles: {
            height: '0.5rem',
            backgroundColor: '#1E2A3A',
            borderRadius: '0.25rem',
            marginBottom: '1.5rem',
          },
          props: {
            valueStyles: {
              backgroundColor: '#00E676',
              borderRadius: '0.25rem',
            },
          },
        }),
        Component.container(
          'technician-mobile-action-buttons',
          [
            Component.button('technician-mobile-on-way', 'On My Way', {
              props: {
                onClick: 'updateStatus',
                variant: 'primary',
                value: 'en-route',
              },
              styles: {
                backgroundColor: '#00B2FF',
                color: '#FFFFFF',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                flex: 1,
                textAlign: 'center',
                marginRight: '0.5rem',
              },
            }),
            Component.button('technician-mobile-arrived', 'Arrived', {
              props: {
                onClick: 'updateStatus',
                variant: 'primary',
                value: 'on-site',
              },
              styles: {
                backgroundColor: '#00B2FF',
                color: '#FFFFFF',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                flex: 1,
                textAlign: 'center',
                marginRight: '0.5rem',
              },
            }),
            Component.button('technician-mobile-complete', 'Complete', {
              props: {
                onClick: 'updateStatus',
                variant: 'success',
                value: 'completed',
              },
              styles: {
                backgroundColor: '#00E676',
                color: '#000000',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                flex: 1,
                textAlign: 'center',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              marginBottom: '1.5rem',
            },
          }
        ),
      ],
      {
        styles: {
          padding: '1rem',
          backgroundColor: '#121926',
          borderBottom: '1px solid #1E2A3A',
        },
      }
    ),
    Component.container(
      'technician-mobile-today-jobs',
      [
        Component.text('technician-mobile-today-title', 'Today\'s Jobs', {
          styles: {
            color: '#FFFFFF',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
          },
        }),
        Component.container(
          'technician-mobile-job-1',
          [
            Component.container(
              'technician-mobile-job-1-time',
              [
                Component.icon('technician-mobile-job-1-time-icon', 'clock', {
                  styles: {
                    color: '#00B2FF',
                    marginRight: '0.5rem',
                  },
                }),
                Component.text('technician-mobile-job-1-time-text', '2:00 PM - 4:00 PM', {
                  styles: {
                    color: '#B0BEC5',
                    fontSize: '0.875rem',
                  },
                }),
              ],
              {
                styles: {
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                },
              }
            ),
            Component.text('technician-mobile-job-1-customer', 'John Smith', {
              styles: {
                color: '#FFFFFF',
                fontWeight: 'bold',
                marginBottom: '0.25rem',
              },
            }),
            Component.container(
              'technician-mobile-job-1-location',
              [
                Component.icon('technician-mobile-job-1-location-icon', 'map-pin', {
                  styles: {
                    color: '#607D8B',
                    marginRight: '0.5rem',
                  },
                }),
                Component.text('technician-mobile-job-1-location-text', '123 Main Street', {
                  styles: {
                    color: '#B0BEC5',
                    fontSize: '0.875rem',
                  },
                }),
              ],
              {
                styles: {
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.25rem',
                },
              }
            ),
            Component.container(
              'technician-mobile-job-1-type',
              [
                Component.icon('technician-mobile-job-1-type-icon', 'tool', {
                  styles: {
                    color: '#607D8B',
                    marginRight: '0.5rem',
                  },
                }),
                Component.text('technician-mobile-job-1-type-text', 'AC Repair', {
                  styles: {
                    color: '#B0BEC5',
                    fontSize: '0.875rem',
                  },
                }),
              ],
              {
                styles: {
                  display: 'flex',
                  alignItems: 'center',
                },
              }
            ),
            Component.badge('technician-mobile-job-1-status', 'In Progress', {
              styles: {
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: '#00B2FF',
                color: '#FFFFFF',
                padding: '0.25rem 0.5rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: 'bold',
              },
            }),
          ],
          {
            styles: {
              position: 'relative',
              padding: '1rem',
              backgroundColor: '#1E2A3A',
              borderRadius: '0.5rem',
              marginBottom: '0.75rem',
            },
          }
        ),
        Component.container(
          'technician-mobile-job-2',
          [
            Component.container(
              'technician-mobile-job-2-time',
              [
                Component.icon('technician-mobile-job-2-time-icon', 'clock', {
                  styles: {
                    color: '#607D8B',
                    marginRight: '0.5rem',
                  },
                }),
                Component.text('technician-mobile-job-2-time-text', '4:30 PM - 6:30 PM', {
                  styles: {
                    color: '#B0BEC5',
                    fontSize: '0.875rem',
                  },
                }),
              ],
              {
                styles: {
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                },
              }
            ),
            Component.text('technician-mobile-job-2-customer', 'Sarah Johnson', {
              styles: {
                color: '#FFFFFF',
                fontWeight: 'bold',
                marginBottom: '0.25rem',
              },
            }),
            Component.container(
              'technician-mobile-job-2-location',
              [
                Component.icon('technician-mobile-job-2-location-icon', 'map-pin', {
                  styles: {
                    color: '#607D8B',
                    marginRight: '0.5rem',
                  },
                }),
                Component.text('technician-mobile-job-2-location-text', '456 Oak Avenue', {
                  styles: {
                    color: '#B0BEC5',
                    fontSize: '0.875rem',
                  },
                }),
              ],
              {
                styles: {
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.25rem',
                },
              }
            ),
            Component.container(
              'technician-mobile-job-2-type',
              [
                Component.icon('technician-mobile-job-2-type-icon', 'tool', {
                  styles: {
                    color: '#607D8B',
                    marginRight: '0.5rem',
                  },
                }),
                Component.text('technician-mobile-job-2-type-text', 'Heating Service', {
                  styles: {
                    color: '#B0BEC5',
                    fontSize: '0.875rem',
                  },
                }),
              ],
              {
                styles: {
                  display: 'flex',
                  alignItems: 'center',
                },
              }
            ),
            Component.badge('technician-mobile-job-2-status', 'Scheduled', {
              styles: {
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: '#FFA000',
                color: '#FFFFFF',
                padding: '0.25rem 0.5rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: 'bold',
              },
            }),
          ],
          {
            styles: {
              position: 'relative',
              padding: '1rem',
              backgroundColor: '#1E2A3A',
              borderRadius: '0.5rem',
              marginBottom: '0.75rem',
            },
          }
        ),
      ],
      {
        styles: {
          padding: '1rem',
          backgroundColor: '#121926',
          borderBottom: '1px solid #1E2A3A',
        },
      }
    ),
    Component.container(
      'technician-mobile-customer-chat',
      [
        Component.container(
          'technician-mobile-customer-info',
          [
            Component.avatar('technician-mobile-customer-avatar', 'JS', {
              styles: {
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                marginRight: '0.75rem',
                backgroundColor: '#1E88E5',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }),
            Component.text('technician-mobile-customer-name', 'John Smith', {
              styles: {
                color: '#FFFFFF',
                fontWeight: 'bold',
                marginBottom: '0.25rem',
              },
            }),
            Component.badge('technician-mobile-customer-job', 'AC Repair #1234', {
              styles: {
                backgroundColor: '#1E2A3A',
                color: '#B0BEC5',
                padding: '0.25rem 0.5rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem',
            },
          }
        ),
        Component.container(
          'technician-mobile-customer-message',
          [
            Component.text('technician-mobile-customer-message-text', 'Hi, my AC stopped working this morning', {
              styles: {
                color: '#FFFFFF',
                backgroundColor: '#1E2A3A',
                padding: '0.75rem',
                borderRadius: '1rem 1rem 1rem 0',
                marginBottom: '0.75rem',
                maxWidth: '80%',
                alignSelf: 'flex-start',
              },
            }),
            Component.text('technician-mobile-technician-message-text', 'I\'m on my way! ETA 15 minutes.', {
              styles: {
                color: '#FFFFFF',
                backgroundColor: '#00B2FF',
                padding: '0.75rem',
                borderRadius: '1rem 1rem 0 1rem',
                marginBottom: '0.75rem',
                maxWidth: '80%',
                alignSelf: 'flex-end',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '1rem',
            },
          }
        ),
        Component.container(
          'technician-mobile-quick-replies',
          [
            Component.button('technician-mobile-reply-1', 'On my way', {
              props: {
                onClick: 'sendQuickReply',
                value: 'on-my-way',
              },
              styles: {
                backgroundColor: '#1E2A3A',
                color: '#FFFFFF',
                padding: '0.5rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
                marginRight: '0.5rem',
              },
            }),
            Component.button('technician-mobile-reply-2', 'Running late', {
              props: {
                onClick: 'sendQuickReply',
                value: 'running-late',
              },
              styles: {
                backgroundColor: '#1E2A3A',
                color: '#FFFFFF',
                padding: '0.5rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
                marginRight: '0.5rem',
              },
            }),
            Component.button('technician-mobile-reply-3', 'Work complete', {
              props: {
                onClick: 'sendQuickReply',
                value: 'work-complete',
              },
              styles: {
                backgroundColor: '#1E2A3A',
                color: '#FFFFFF',
                padding: '0.5rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              marginBottom: '1rem',
            },
          }
        ),
        Component.container(
          'technician-mobile-message-input',
          [
            Component.input('technician-mobile-message-text', '', {
              props: {
                placeholder: 'Type a message...',
                onKeyPress: 'handleMessageKeyPress',
              },
              styles: {
                flex: 1,
                backgroundColor: '#1E2A3A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '1rem',
                padding: '0.75rem',
                marginRight: '0.5rem',
              },
            }),
            Component.button('technician-mobile-message-send', '', {
              props: {
                onClick: 'sendMessage',
                icon: 'send',
              },
              styles: {
                backgroundColor: '#00B2FF',
                color: '#FFFFFF',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              alignItems: 'center',
            },
          }
        ),
      ],
      {
        styles: {
          padding: '1rem',
          backgroundColor: '#121926',
        },
      }
    ),
    Component.container(
      'technician-mobile-nav',
      [
        Component.container(
          'technician-mobile-nav-item-1',
          [
            Component.icon('technician-mobile-nav-item-1-icon', 'home', {
              styles: {
                color: '#00E676',
                fontSize: '1.25rem',
                marginBottom: '0.25rem',
              },
            }),
            Component.text('technician-mobile-nav-item-1-text', 'Jobs', {
              styles: {
                color: '#00E676',
                fontSize: '0.75rem',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
            },
          }
        ),
        Component.container(
          'technician-mobile-nav-item-2',
          [
            Component.icon('technician-mobile-nav-item-2-icon', 'message-circle', {
              styles: {
                color: '#607D8B',
                fontSize: '1.25rem',
                marginBottom: '0.25rem',
              },
            }),
            Component.text('technician-mobile-nav-item-2-text', 'Messages', {
              styles: {
                color: '#607D8B',
                fontSize: '0.75rem',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
            },
          }
        ),
        Component.container(
          'technician-mobile-nav-item-3',
          [
            Component.icon('technician-mobile-nav-item-3-icon', 'calendar', {
              styles: {
                color: '#607D8B',
                fontSize: '1.25rem',
                marginBottom: '0.25rem',
              },
            }),
            Component.text('technician-mobile-nav-item-3-text', 'Schedule', {
              styles: {
                color: '#607D8B',
                fontSize: '0.75rem',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
            },
          }
        ),
        Component.container(
          'technician-mobile-nav-item-4',
          [
            Component.icon('technician-mobile-nav-item-4-icon', 'user', {
              styles: {
                color: '#607D8B',
                fontSize: '1.25rem',
                marginBottom: '0.25rem',
              },
            }),
            Component.text('technician-mobile-nav-item-4-text', 'Profile', {
              styles: {
                color: '#607D8B',
                fontSize: '0.75rem',
              },
            }),
          ],
          {
            styles: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
            },
          }
        ),
      ],
      {
        styles: {
          display: 'flex',
          justifyContent: 'space-around',
          padding: '0.75rem 0',
          backgroundColor: '#121926',
          borderTop: '1px solid #1E2A3A',
          position: 'sticky',
          bottom: 0,
        },
      }
    ),
  ],
  {
    styles: {
      backgroundColor: '#121926',
      color: '#FFFFFF',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  }
);

/**
 * Export all HVAC service components
 */
export const HVACServiceComponents = [
  DashboardStats,
  NinjaCommunications,
  ActiveWorkOrders,
  TeamStatus,
  QuickActions,
  WorkflowDesigner,
  WorkOrderForm,
  TechnicianMobileView,
];