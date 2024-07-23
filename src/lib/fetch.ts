const Fetch = () => {
  return async (url: string, options?: RequestInit) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api${url}`;
    const requestOptions = {
      ...options,
      headers: new Headers({
        'Content-Type': 'application/json',
        ...options?.headers,
      }),
    };
    const response = await fetch(apiUrl, requestOptions);

    return response;
  };
};

export default Fetch();
