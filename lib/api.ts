export function login(email?: string, password?: string, headers?: Headers) {
    return fetch("http://backend.test/login", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            email,
            password
        })
    });
}

export function csrfCookie() {
    return fetch("http://backend.test/sanctum/csrf-cookie", {
        method: "GET",
    });
}

export function backendApi() {}
