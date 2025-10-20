import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Divider } from 'antd';
import { MailOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Login attempt:", { email: values.email });
    setIsLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: 450,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          borderRadius: 16,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)'
        }}
        bordered={false}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(102, 126, 234, 0.2)',
                borderRadius: '50%',
                filter: 'blur(20px)'
              }} />
              <div style={{
                position: 'relative',
                background: '#667eea',
                width: 80,
                height: 80,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 40
              }}>
                {/* Icon placeholder */}
              </div>
            </div>
          </div>

          <Title level={2} style={{ marginBottom: 8, fontWeight: 700 }}>
            Turtle Engine
          </Title>
          <Text type="secondary" style={{ fontSize: 16 }}>
            Dive into your workspace
          </Text>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, fontSize: 32, color: '#764ba2' }}>
            {/* Decorative icon placeholder */}
          </div>
        </div>

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="captain@turtleengine.com"
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            label={
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Password</span>
                <a href="#" style={{ color: '#764ba2', textDecoration: 'none' }}>
                  Forgot password?
                </a>
              </div>
            }
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="••••••••"
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              block
              style={{
                background: '#667eea',
                borderColor: '#667eea',
                height: 44,
                fontSize: 16,
                fontWeight: 500,
                borderRadius: 8,
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
            >
              {isLoading ? 'Navigating...' : 'Sign In'}
            </Button>
          </Form.Item>
        </Form>

        <Divider style={{ margin: '24px 0' }} />

        <div style={{ textAlign: 'center' }}>
          <Text type="secondary">
            New to Turtle Engine?{' '}
            <a href="/#/register" style={{ color: '#764ba2', fontWeight: 500, textDecoration: 'none' }}>
              Create an account
            </a>
          </Text>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginTop: 16,
            color: 'rgba(0, 0, 0, 0.45)',
            fontSize: 12
          }}>
            {/* Footer icon placeholder */}
            <span>Powered by React, Three JS, Golang</span>
            {/* Footer icon placeholder */}
          </div>
        </div>
      </Card>
    </div>
  );
}