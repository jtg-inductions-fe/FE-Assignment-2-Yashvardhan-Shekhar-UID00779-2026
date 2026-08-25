// Defines the available alert severity levels.
export type Severity = 'warning' | 'info' | 'success' | 'error' | null;

// Defines the structure of an alert message.
export type Alert = {
    severity: Severity;
    message: string;
};
