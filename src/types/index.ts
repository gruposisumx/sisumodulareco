export interface AppModule {
  name: string;
  path: string;
  component: React.ComponentType;
  icon: React.ComponentType;
  standalone: boolean;
  description: string;
  isActive?: boolean;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
  }>;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface Revenue {
  id: string;
  source: string;
  amount: number;
  date: string;
  description: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;
  status: 'active' | 'inactive';
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  amount: number;
  type: 'salary' | 'bonus' | 'deduction';
  date: string;
  status: 'pending' | 'paid';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'vacation' | 'sick' | 'personal';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

export interface BenefitPlan {
  id: string;
  name: string;
  type: 'health' | 'dental' | 'vision' | 'life' | '401k';
  coverage: string;
  cost: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  department: string;
  phoneNumber: string;
  timezone: string;
  language: string;
  twoFactorEnabled: boolean;
}

export interface SecuritySettings {
  passwordLastChanged: string;
  loginHistory: Array<{
    id: string;
    timestamp: string;
    device: string;
    location: string;
    ip: string;
  }>;
  securityQuestions: Array<{
    question: string;
    answered: boolean;
  }>;
}

export interface NotificationPreference {
  type: string;
  enabled: boolean;
  frequency: 'immediate' | 'daily' | 'weekly' | 'never';
}

export interface SettingCategory {
  id: string;
  name: string;
  icon: React.ComponentType;
  description: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
}

export interface SupportTicket {
  id: string;
  customerId: string;
  subject: string;
  status: 'open' | 'closed';
  priority: 'low' | 'medium' | 'high';
  messages: Array<{
    id: string;
    sender: 'customer' | 'agent';
    content: string;
    timestamp: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  amount: number;
  status: 'paid' | 'pending';
  date: string;
  items: Array<{
    description: string;
    amount: number;
  }>;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'paypal' | 'mercado_pago' | 'bank_transfer' | 'store_credit';
  customerId: string;
  last4: string;
  expMonth?: number;
  expYear?: number;
  brand?: string;
  accountNumber?: string;
  bankName?: string;
  creditBalance?: number;
  isDefault: boolean;
  status: 'active' | 'expired' | 'inactive';
}

export interface BillingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
  barcode?: string;
  location: string;
  minimumStock: number;
  maximumStock: number;
  reorderPoint: number;
  unitOfMeasure: string;
  supplier: string;
  lastRestocked: string;
  stockHistory: StockMovement[];
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued';
  tags: string[];
  dimensions?: {
    length: number;
    width: number;
    height: number;
    weight: number;
    unit: string;
  };
}

export interface StockMovement {
  id: string;
  productId: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  date: string;
  performedBy: string;
  reference?: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  type: 'regular' | 'preferred' | 'vip';
  status: 'active' | 'inactive';
}

export interface Order {
  id: string;
  customerId: string;
  products: Array<{productId: string; quantity: number}>;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}