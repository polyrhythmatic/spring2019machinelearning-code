Uses [tsne-js](https://github.com/scienceai/tsne-js)

Images from [Caltech image dataset](http://www.vision.caltech.edu/Image_Datasets/Caltech101/)

Gather the images you would like to sort into a folder. I recommend [this one](https://chrome.google.com/webstore/detail/download-all-images/nnffbdeachhbpfapjklmpnmjcgamcdmm?hl=en).

Sort through the images and resize any that are over 1mb. All images are resized by mobilenet to around 250x250px anyways. You can always display larger versions than the ones you analyze.

Using terminal, CD into the folder that holds the images and enter the following command:
```
python -c 'import os, json; print "var fileNames = " + json.dumps(os.listdir("."))' > fileNames.js
```

Then open the "preprocess" page first to generate the features. Then run the main sketch. You can refactor the code to save the t-SNE positions in order to precalculate them.