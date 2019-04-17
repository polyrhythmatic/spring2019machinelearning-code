First collect your audio samples. This example only works with short sounds because of how the features are extracted. Please note I did not leave the sounds in place since I do not have a license to share :)

Using terminal, first cd into the directory and run 

```
jupyter notebook

```
[More here on installing jupyter notebook](https://jupyter.readthedocs.io/en/latest/install.html#id4)

This runs the jupyter interactive notebook. You should then be able to open "feats.ipynb" with the jupyter interactive browser.

This is a reduced and simplified version of the ml4a guide. For more information, check out: [ml4a - Audio t-SNE](https://github.com/ml4a/ml4a-guides/blob/master/notebooks/audio-tsne.ipynb). 

You will then need to install librosa and numpy. You can do this in the terminal with:

```
pip install numpy && pip install librosa
```

Run the code to extract features and filenames, and then preprocess.html and finally index.html to view.