import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import type { ChatMessage } from '../services/chatService';
import {
    fetchMessages,
    getSupportChannelId,
    sendMessage,
} from '../services/chatService';

export const ChatWidget: React.FC = () => {
    const { user, token, refreshAccessToken } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const isAdmin = !!user?.roles.some((role) => ['Admin', 'Manager'].includes(role));
    const userChannelId = user ? getSupportChannelId(user.id) : null;
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [inputText, setInputText] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pollingStopped, setPollingStopped] = useState(false);
    const adminId = import.meta.env.VITE_CHAT_ADMIN_ID?.trim();
    const conversations = Array.from(new Set(messages.map((message) => message.channelId)));
    const activeChannelId = isAdmin ? selectedConversationId : userChannelId;
    const visibleMessages = isAdmin
        ? messages.filter((message) => message.channelId === selectedConversationId)
        : messages;

    const handleChatError = useCallback((err: unknown) => {
        const message = err instanceof Error ? err.message : 'Could not complete the chat request.';
        setPollingStopped(true);
        setError(message);
    }, []);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;
        if (isOpen && userChannelId && !pollingStopped) {
            const loadMessages = async () => {
                try {
                    const loadedMessages = await fetchMessages(
                        isAdmin ? null : userChannelId,
                        token,
                        refreshAccessToken,
                    );
                    setMessages(loadedMessages);
                    if (isAdmin && loadedMessages.length > 0) {
                        const availableConversations = Array.from(
                            new Set(loadedMessages.map((message) => message.channelId)),
                        );
                        setSelectedConversationId((current) =>
                            current && availableConversations.includes(current)
                                ? current
                                : availableConversations[0],
                        );
                    }
                    setError(null);
                } catch (err) {
                    handleChatError(err);
                }
            };
            void loadMessages();
            interval = setInterval(loadMessages, 3000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isOpen, userChannelId, isAdmin, token, refreshAccessToken, pollingStopped, handleChatError]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || !activeChannelId || isSending) return;
        const recipientId = isAdmin ? activeChannelId : adminId;
        if (!recipientId) {
            setError('Support chat is not configured. Set VITE_CHAT_ADMIN_ID to the admin user UUID.');
            return;
        }

        const textToSend = inputText;
        setIsSending(true);
        setError(null);
        try {
            await sendMessage(activeChannelId, textToSend, recipientId, token, refreshAccessToken);
            setInputText("");
            setMessages(await fetchMessages(isAdmin ? null : userChannelId, token, refreshAccessToken));
        } catch (err) {
            handleChatError(err);
        } finally {
            setIsSending(false);
        }
    };

    if (!user) return null;

    return (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
            {!isOpen && (
                <button
                    className="btn btn-primary rounded-circle shadow-lg"
                    style={{ width: '60px', height: '60px' }}
                    onClick={() => {
                        setPollingStopped(false);
                        setIsOpen(true);
                    }}
                >
                    💬
                </button>
            )}

            {isOpen && (
                <div className="card shadow-lg" style={{ width: isAdmin ? '360px' : '300px', height: '440px', display: 'flex', flexDirection: 'column' }}>
                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <span>{isAdmin ? 'Support Inbox' : 'Admin Support'}</span>
                        <button className="btn-close btn-close-white" onClick={() => setIsOpen(false)}></button>
                    </div>

                    <div className="card-body overflow-auto flex-grow-1" style={{ backgroundColor: '#f8f9fa' }}>
                        {isAdmin && (
                            <div className="d-flex gap-2 overflow-auto mb-3">
                                {conversations.map((conversationId) => (
                                    <button
                                        key={conversationId}
                                        type="button"
                                        className={`btn btn-sm ${selectedConversationId === conversationId ? 'btn-primary' : 'btn-outline-primary'}`}
                                        onClick={() => setSelectedConversationId(conversationId)}
                                    >
                                        User {conversationId.slice(0, 8)}
                                    </button>
                                ))}
                            </div>
                        )}
                        {visibleMessages.map((msg, idx) => {
                            const isMine = msg.createdBy === user.id;
                            return (
                                <div key={msg.id || idx} className={`mb-2 text-${isMine ? 'end' : 'start'}`}>
                                    <div
                                        className={`d-inline-block p-2 rounded ${isMine ? 'bg-primary text-white' : 'bg-light text-dark border'}`}
                                        style={{ maxWidth: '80%' }}
                                    >
                                        {msg.body}
                                    </div>
                                </div>
                            );
                        })}
                        {isAdmin && conversations.length === 0 && !error && (
                            <p className="text-muted mb-0">No support conversations yet.</p>
                        )}
                        {!isAdmin && !adminId && (
                            <div className="alert alert-warning py-2" role="alert">
                                Support chat needs an admin account configured.
                            </div>
                        )}
                        {error && <div className="alert alert-danger py-2 mb-0" role="alert">{error}</div>}
                    </div>

                    <div className="card-footer p-2">
                        <form onSubmit={handleSend} className="d-flex gap-2">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Type a message..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary btn-sm" disabled={isSending || !inputText.trim() || !activeChannelId || (!isAdmin && !adminId)}>
                                {isSending ? 'Sending…' : 'Send'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};