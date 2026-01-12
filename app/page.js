import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default function HomePage() {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        Collection Vault
      </h1>

      <p className="mt-2 text-gray-600">
        Your personal collection manager
      </p>
    </main>
  )
}
