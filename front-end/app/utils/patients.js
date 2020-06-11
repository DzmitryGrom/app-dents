import axios from "../core/axios";

export default {
  get: () => axios.get('/patients'),
  add: values => axios.post('/patient', values),
  remove: id => axios.delete(`/patient/${id}`),
  patch: (id, values) => axios.patch(`/patient/${id}`, values),
  show: id =>  axios.get(`/patient/${id}`)
}