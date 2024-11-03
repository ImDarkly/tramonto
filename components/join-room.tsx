"use client";
import { Hash } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFetchRoom } from "@/hooks/useFetchRoom";
import { useNotificationHandler } from "@/hooks/useNotificationHandler";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

export default function JoinRoom() {
    const [inputCode, setInputCode] = useState("");
    const [isRoomValid, setIsRoomValid] = useState(false);
    const router = useRouter();
    const { fetchRoom } = useFetchRoom();
    const handleNotification = useNotificationHandler();

    const handleInputChange = (code: string) => {
        code = code.toLowerCase().slice(0, 6);
        setInputCode(code);
        checkRoomExists(code);
    };

    const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isRoomValid) {
            router.push(`/room/${inputCode}`);
        }
    };

    const checkRoomExists = async (code: string) => {
        if (code.length === 6) {
            const { data, error } = await fetchRoom(code);
            if (error) {
                handleNotification("ROOM_NOT_FOUND", {
                    code: code.toLocaleUpperCase(),
                });
                setInputCode("");
            }
            setIsRoomValid(!!data);
        } else {
            setIsRoomValid(false);
        }
    };

    return (
        <form onSubmit={handleJoinRoom} className="flex w-fit flex-col gap-4  ">
            <div className="flex flex-col gap-2">
                <Label htmlFor="room-code">Room Code</Label>
                <div className="flex">
                    <div className="flex items-center h-10 justify-center bg-input rounded-l-md aspect-square">
                        <Hash size={16} />
                    </div>
                    <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        inputMode="text"
                        value={inputCode}
                        onChange={handleInputChange}
                        id="room-code"
                    >
                        <InputOTPGroup className="uppercase">
                            <InputOTPSlot
                                className="first:rounded-none"
                                index={0}
                            />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
            </div>
            <Button disabled={!isRoomValid}>Join Room</Button>
        </form>
    );
}
