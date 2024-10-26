export const NOTIFICATION_MESSAGES = {
    PARTICIPATION_CHECK: {
        title: "Error Checking Participation",
        description:
            "We encountered an issue while checking your participation status. Please try again later.",
        severity: "error" as const,
    },
    ROOM_NOT_FOUND: {
        title: "Room Not Found",
        description:
            "We couldn't retrieve the room information for code: #{code}. Please make sure the room code is correct and try again.",
        severity: "warning" as const,
    },
    ALREADY_PARTICIPANT: {
        title: "You are already a participant in this room",
        description: "Feel free to continue participating!",
        severity: "success" as const,
    },
    ANONYMOUS_SIGNIN_FAILED: {
        title: "Anonymous Sign-In Failed",
        description:
            "Unable to complete anonymous sign-in. Please try again later or contact support if the issue persists.",
        severity: "error" as const,
    },
    FAILED_TO_JOIN_ROOM: {
        title: "Failed to Join Room",
        description:
            "We encountered an issue while trying to join the room. Please check your network connection or try again later.",
        severity: "error" as const,
    },
    SUCCESSFULLY_JOINED_ROOM: {
        title: "Successfully joined the room!",
        description: "Welcome to the room!",
        severity: "success" as const,
    },
    ROOM_CREATED_SUCCESSFULLY: {
        title: "Room created successfully!",
        description: "Your room code is #{code}.",
        severity: "success" as const,
    },
    ROOM_DELETED_SUCCESSFULLY: {
        title: "Room deleted successfully!",
        description: "The room has been deleted successfully.",
        severity: "success" as const,
    },
    FAILED_TO_FETCH_PLAYER_COUNT: {
        title: "Failed to Fetch Player Count",
        description:
            "We encountered an issue while retrieving the player count for room code: #{code}. Please try again later.",
        severity: "error" as const,
    },
    URL_COPIED_SUCCESSFULLY: {
        title: "URL Copied",
        description:
            "The room link has been copied to your clipboard. Share it with others to invite them!",
        severity: "success" as const,
    },
} as const;

export type NotificationKey = keyof typeof NOTIFICATION_MESSAGES;

export function getNotificationMessage(
    key: NotificationKey,
    params?: Record<string, string>
) {
    const message = NOTIFICATION_MESSAGES[key];
    if (params) {
        return {
            ...message,
            description: message.description.replace(
                /{(\w+)}/g,
                (_, key) => params[key] || `{${key}}`
            ),
        };
    }
    return message;
}
