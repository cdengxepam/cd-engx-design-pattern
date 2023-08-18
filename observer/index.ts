interface EventListener {
    update(filename: string): void;
  }
  
  class EventManager {
    private listeners: { [key: string]: EventListener[] } = {};
  
    public subscribe(eventType: string, listener: EventListener) {
      if (!this.listeners[eventType]) {
        this.listeners[eventType] = [];
      }
      this.listeners[eventType].push(listener);
    }
  
    public unsubscribe(eventType: string, listener: EventListener) {
      const typeListeners = this.listeners[eventType];
      if (!typeListeners) {
        return;
      }
      const index = typeListeners.indexOf(listener);
      if (index !== -1) {
        typeListeners.splice(index, 1);
      }
    }
  
    public notify(eventType: string, data: any) {
      const typeListeners = this.listeners[eventType];
      if (!typeListeners) {
        return;
      }
      for (const listener of typeListeners) {
        listener.update(data);
      }
    }
  }
  
  class Editor {
    public events: EventManager = new EventManager();
    private file: File;
  
    public openFile(path: string) {
      this.file = new File(path);
      this.events.notify("open", this.file.name);
    }
  
    public saveFile() {
      this.file.write();
      this.events.notify("save", this.file.name);
    }
  }
  
  class LoggingListener implements EventListener {
    private log: File;
    private message: string;
  
    constructor(logFilename: string, message: string) {
      this.log = new File(logFilename);
      this.message = message;
    }
  
    public update(filename: string) {
      this.log.write(this.message.replace('%s', filename));
    }
  }
  
  class EmailAlertsListener implements EventListener {
    private email: string;
    private message: string;
  
    constructor(email: string, message: string) {
      this.email = email;
      this.message = message;
    }
  
    public update(filename: string) {
      system.email(this.email, this.message.replace('%s', filename));
    }
  }
  
  // An application can configure publishers and subscribers at
  // runtime.
  class Application {
    public config() {
      const editor = new Editor();
  
      const logger = new LoggingListener(
        "/path/to/log.txt",
        "Someone has opened the file: %s"
      );
      editor.events.subscribe("open", logger);
  
      const emailAlerts = new EmailAlertsListener(
        "admin@example.com",
        "Someone has changed the file: %s"
      );
      editor.events.subscribe("save", emailAlerts);
    }
  }