import FloatingShape from '../component/FloatingShape/FloatingShape';

const withBackground = (WrappedComponent) => {
    return function WithBackground(props) {
        return (
            <div
                className="min-h-screen bg-gradient-to-br
                from-blue-500 to-emerald-900 flex items-center justify-center relative overflow-hidden"
            >
                <FloatingShape
                    color="bg-green-500"
                    size="w-64 h-64"
                    top="-5%"
                    left="10%"
                    delay={0}
                />
                <FloatingShape
                    color="bg-emerald-500"
                    size="w-48 h-48"
                    top="70%"
                    left="80%"
                    delay={5}
                />
                <FloatingShape
                    color="bg-lime-500"
                    size="w-32 h-32"
                    top="40%"
                    left="-10%"
                    delay={2}
                />

                <div className="w-full max-w-md">
                    <WrappedComponent {...props} />
                </div>
            </div>
        );
    };
};

export default withBackground;
