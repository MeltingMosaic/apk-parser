define(["require", "node_modules/q/q", "./sampleManifest", "lib/apkreader/parser/manifest"], function (require, q, sampleManifest, manifestParser) {
    chai.should();

    describe("Requiring", function () {
        it("should find the manifest parser", function () {
            manifestParser.should.not.be.null;
        });
    });

    describe("APK Parser", function () {
        var blob = dataURItoBlob(sampleManifest);

        it("should correctly parse a binary androidManifest.xml", function (done) {

            blobToArrayBuffer(blob).then(function (arrayBuffer) {

                arrayBuffer.should.not.be.null;
                var parser = new manifestParser(arrayBuffer);
                var manifest = parser.parse();
                console.log(manifest);
                manifest.package.should.be.equal("com.microsoft.translator");
            }).then(function () {
                done();
            }).catch(function(error){
                done(error);
            });
        })
    });

    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], { type: mimeString });
        return blob;
    }

    function blobToArrayBuffer(blob) {
        var deferred = q.defer();
        var arrayBuffer;
        var fileReader = new FileReader();

        fileReader.onload = function () {
            arrayBuffer = this.result;
            deferred.resolve(arrayBuffer);
        };

        fileReader.readAsArrayBuffer(blob);
        return deferred.promise;
    }
});