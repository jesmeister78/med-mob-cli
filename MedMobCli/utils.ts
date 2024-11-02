// Custom function to handle circular references
export const safeStringify = (obj: any) => {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular]';
        }
        seen.add(value);
      }
      return value;
    });
  };

  export const prettyPrint = <T>(obj: T, indent: number = 2): void => {
    console.log(
      JSON.stringify(
        obj,
        (_, value) => {
          // Handle special cases like undefined and functions
          if (value === undefined) return 'undefined';
          if (typeof value === 'function') return value.toString();
          return value;
        },
        indent
      )
    );
  };