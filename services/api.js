const API_BASE_URL = "https://brunch.cafeterialabaranda.com:1880"

// Autenticación
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error en login:", error)
    throw error
  }
}

// Obtener todas las reservas
export const getReservations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/reservas`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
    })

    if (!response.ok) {
      console.error(`Error HTTP: ${response.status}`)
      return []
    }

    // Verificar si la respuesta es JSON
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json()
      return Array.isArray(data) ? data : []
    } else {
      // Si no es JSON, manejar como texto
      const text = await response.text()
      console.error("La API devolvió texto en lugar de JSON:", text)
      return []
    }
  } catch (error) {
    console.error("Error al obtener reservas:", error)
    return []
  }
}

// Obtener reservas por fecha
export const getReservationsByDate = async (date) => {
  try {
    // Asegurar formato YYYY-MM-DD primero
    const formattedDate = typeof date === "string" ? date : date.toISOString().split("T")[0]

    // Reordenar a DD-MM-YYYY para el backend
    const [year, month, day] = formattedDate.split("-")
    const fechaFormateada = `${day}-${month}-${year}`

    const response = await fetch(`${API_BASE_URL}/reservas/fecha/${fechaFormateada}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
    })

    if (!response.ok) {
      console.error(`Error HTTP: ${response.status}`)
      return []
    }

    // Verificar si la respuesta es JSON
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json()
      return Array.isArray(data) ? data : []
    } else {
      const text = await response.text()
      console.error("La API devolvió texto en lugar de JSON:", text)
      return []
    }
  } catch (error) {
    console.error(`Error al obtener reservas por fecha:`, error)
    return []
  }
}


// Obtener una reserva específica
export const getReservation = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reservas/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
    })

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error al obtener reserva ${id}:`, error)
    throw error
  }
}

// Crear una nueva reserva
export const createReservation = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al crear reserva:", error)
    throw error
  }
}

// Actualizar una reserva existente
export const updateReservation = async (id, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reservas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error al actualizar reserva ${id}:`, error)
    throw error
  }
}

// Eliminar una reserva
export const deleteReservation = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reservas/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error al eliminar reserva ${id}:`, error)
    throw error
  }
}

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return localStorage.getItem("auth") === "true"
}

// Función para establecer la sesión
export const setSession = (sessionData) => {
  localStorage.setItem("auth", "true")
  // Puedes almacenar más datos de sesión si es necesario
}
