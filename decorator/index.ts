// The component interface defines operations that can be altered by decorators.
interface DataSource {
    writeData(data: any): void;
    readData(): any;
}

// Concrete components provide default implementations for the operations. There might be several variations of
// these classes in a program.
class FileDataSource implements DataSource {
    constructor(private filename: string) {}

    public writeData(data: any): void {
        // Write data to file.
    }

    public readData(): any {
        // Read data from file.
    }
}

// The base decorator class follows the same interface as the other components. The primary purpose of this class is
// to define the wrapping interface for all concrete decorators. The default implementation of the wrapping code
// might include a field for storing a wrapped component and the means to initialize it.
class DataSourceDecorator implements DataSource {
    protected wrappee: DataSource;

    constructor(source: DataSource) {
        this.wrappee = source;
    }

    // The base decorator simply delegates all work to the wrapped component. Extra behaviors can be added in
    // concrete decorators.
    public writeData(data: any): void {
        this.wrappee.writeData(data);
    }

    // Concrete decorators may call the parent implementation of the operation instead of calling the wrapped object
    // directly. This approach simplifies extension of decorator classes.
    public readData(): any {
        return this.wrappee.readData();
    }
}

// Concrete decorators must call methods on the wrapped object, but may add something of their own to the result.
// Decorators can execute the added behavior either before or after the call to a wrapped object.
class EncryptionDecorator extends DataSourceDecorator {
    public writeData(data: any): void {
        // 1. Encrypt passed data.
        // 2. Pass encrypted data to the wrapped object's writeData method.
    }

    public readData(): any {
        // 1. Get data from the wrapped object's readData method.
        // 2. Try to decrypt it if it's encrypted.
        // 3. Return the result.
        return null;
    }
}

// You can wrap objects in several layers of decorators.
class CompressionDecorator extends DataSourceDecorator {
    public writeData(data: any): void {
        // 1. Compress passed data.
        // 2. Pass compressed data to the wrapped object's writeData method.
    }

    public readData(): any {
        // 1. Get data from the wrapped object's readData method.
        // 2. Try to decompress it if it's compressed.
        // 3. Return the result.
        return null;
    }
}

// Option 1. A simple example of a decorator assembly.
class Application {
    public dumbUsageExample(): void {
        let source: DataSource = new FileDataSource('somefile.dat');
        source.writeData(salaryRecords);
        // The target file has been written with plain data.

        source = new CompressionDecorator(source);
        source.writeData(salaryRecords);
        // The target file has been written with compressed data.

        source = new EncryptionDecorator(source);
        // The source variable now contains this:
        // Encryption > Compression > FileDataSource
        source.writeData(salaryRecords);
        // The file has been written with compressed and encrypted data.
    }
}

// Option 2. Client code that uses an external data source. SalaryManager objects neither know nor care about data
// storage specifics. They work with a pre-configured data source received from the app configurator.
class SalaryManager {
    private source: DataSource;

    constructor(source: DataSource) {
        this.source = source;
    }

    public load(): any {
        return this.source.readData();
    }

    public save(): void {
        this.source.writeData(salaryRecords);
        // ...Other useful methods...
    }
}

// The app can assemble different stacks of decorators at runtime, depending on the configuration or environment.
class ApplicationConfigurator {
    public configurationExample(): void {
        let source: DataSource = new FileDataSource('salary.dat');
        if (enabledEncryption) {
            source = new EncryptionDecorator(source);
        }
        if (enabledCompression) {
            source = new CompressionDecorator(source);
        }

        const logger = new SalaryManager(source);
        const salary = logger.load();
    }
}