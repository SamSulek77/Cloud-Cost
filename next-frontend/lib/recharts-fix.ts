if (typeof window !== 'undefined') {
    try {
      // @ts-ignore
      if (!window.excludeEventProps) {
        // @ts-ignore
        window.excludeEventProps = (props: any) => {
          if (!props) return {};
          const eventProps = [
            'onClick', 'onMouseEnter', 'onMouseLeave', 'onMouseMove',
            'onMouseDown', 'onMouseUp', 'onTouchStart', 'onTouchMove', 'onTouchEnd'
          ];
          const result = { ...props };
          eventProps.forEach(prop => delete result[prop]);
          return result;
        };
      }
    } catch (e) {}
  }
  
  export {};