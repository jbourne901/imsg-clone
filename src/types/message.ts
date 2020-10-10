export interface IMessage {
    id: string;
    text: string;
    timestamp: number;
    userPhoto?: string;
    userName: string;
    userId: string;
    userEmail: string;
}

export const testMessages: IMessage[] = [
    {   id: "1",
        text: "Test message",
        timestamp:  new Date().getTime(),
        userName: "Hohn Smith",
        userId: "1",
        userEmail: "test@test.com"
    },
    {   id: "2",
        text: "Test messag2",
        timestamp:  new Date().getTime(),
        userName: "John Homes",
        userId: "1",
        userEmail: "ltrboks@gmail.com"
    },
    {   id: "3",
        text: "Test messag3",
        timestamp:   new Date().getTime(),
        userName: "Hohn Smith",
        userId: "1",
        userEmail: "test@test.com"
    },
];
