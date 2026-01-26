import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

export function PracticeAlert() {
    return (
        // 1. We use the Alert component we just installed
        <Alert className="mt-8 bg-red-100 border-red-500">
            {/* 2. An Icon makes it look better */}
            <Terminal className="h-4 w-4" />

            {/* 3. The Title of the alert */}
            <AlertTitle>Heads up!</AlertTitle>

            {/* 4. The description content */}
            <AlertDescription>
                You can add components to your app using the cli.
            </AlertDescription>
        </Alert>
    )
}
