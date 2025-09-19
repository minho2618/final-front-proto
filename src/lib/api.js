import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:9000/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('Authorization')
  },
  
});

// Add a request interceptor to include the auth token
// This is a placeholder for now. Will be implemented properly after login is done.
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
});


export default apiClient;

// Product APIs
export const getAllProducts = async (page = 0, size = 20) => {
  try {
    const response = await apiClient.get('/products', { params: { page, size } });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// export const getProducts = async () => {
//   try {

//   }
// }

export const getProductById = async (productId) => {
  try {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${productId}:`, error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await apiClient.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
};

// Auth APIs
export const signUp = async (userData) => {
  try {
    const response = await apiClient.post('/members', userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const createSeller = async (sellerData) => {
    try {
        const response = await apiClient.post('/sellers', sellerData);
        return response.data;
    } catch (error) {
        console.error('Error creating seller:', error);
        throw error;
    }
};

// Member APIs
export const getMemberById = async (memberId) => {
    try {
        const response = await apiClient.get(`/members/id/${memberId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching member with id ${memberId}:`, error);
        throw error;
    }
};

export const getAllMembers = async (page = 0, size = 20) => {
    try {
        const response = await apiClient.get('/members', { params: { page, size } });
        return response.data;
    } catch (error) {
        console.error('Error fetching all members:', error);
        throw error;
    }
};

export const updateMember = async (memberId, memberData) => {
    try {
        const response = await apiClient.put(`/members/id/${memberId}`, memberData);
        return response.data;
    } catch (error) {
        console.error(`Error updating member with id ${memberId}:`, error);
        throw error;
    }
};

// Order APIs
export const createOrder = async (orderData) => {
    try {
        const response = await apiClient.post('/orders', orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const getAllOrders = async (page = 0, size = 20) => {
    try {
        // Assuming GET /orders returns all orders for admin.
        // The spec is ambiguous here.
        const response = await apiClient.get('/orders', { params: { page, size } });
        return response.data;
    } catch (error) {
        console.error('Error fetching all orders:', error);
        throw error;
    }
};
