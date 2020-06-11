import axios from "../core/axios";

export default {
  get: () => axios.get('/appointments'),
  remove: id => axios.delete(`/appointment/${id}`),
  patch: (id, values) => axios.patch(`/appointment/${id}`, values),
  add: values => axios.post(`/appointment`, values)
}