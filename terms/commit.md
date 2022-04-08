# Commit

When you commit your changes using Git, you are created a version a file that can be referenced even after further changes to the file are made and committed. 

Making a commit involves 2 steps. 
- First, you need to stage  the files, or tell Git, which files it should pay attention to. Where are your changes? You use the command `git add` to point to them. 
- Second, you create the version by committing the changes. You use the command `git commit` to take the snapshot and add a label (the -m flag) that can help you in returning to that version in the future.

Making a commit is a lot like taking a photo. First, you have to decide who will be in the photo and arrange your friends or family in front of the camera (the staging process). Once everyone is present and ready, you take the picture, entering that moment into the permanent record (the commit process).

Before any of this can happen, you must initialize the Git folder, or put it on Git's radar. This only needs to happen one time to a folder.