interface ToastProps { message: string }
export default function Toast({ message }: ToastProps) {
    return <div className="toast">⚽ {message}</div>
}
