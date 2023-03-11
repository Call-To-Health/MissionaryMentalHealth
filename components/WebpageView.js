//webURL should be a single string url
export const WebpageView = (webURL) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView 
            source={{ uri: webURL }} 
            />
        </SafeAreaView>
    );
}