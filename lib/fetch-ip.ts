import { RefObject } from "react"

export const fetchRemoteIp = async (remoteIp: RefObject<string | null>) => {
  try {
    const response = await fetch("https://api.ipify.org?format=json")
    const data = (await response.json()) as { ip: string }
    remoteIp.current = data.ip
  } catch (error) {
    console.error("Failed to fetch remote IP:", error)
  }
}
