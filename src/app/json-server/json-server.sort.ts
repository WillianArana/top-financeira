export const sortAt = (
  key: string,
  input: {
    [key: string]: {
      order: string;
      default: string;
    };
  },
) => {
  let sort = '';
  let order = '';
  for (const [k, v] of Object.entries(input)) {
    if (key === k) {
      v.order = v.order === '' ? v.default : v.order === 'asc' ? 'desc' : 'asc';
      sort = k;
      order = v.order;
    } else {
      v.order = '';
    }
  }
  return {
    sort,
    order,
  };
};
