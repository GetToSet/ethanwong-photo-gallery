# /bin/bash
find ./assets/raw -mindepth 2 -maxdepth 2 -type f -name '*.png' -o -name '*.jpg' -exec sh -c '
  rm -rf ./assets/photos
  for f do
    source=$f
    output=`echo $source | sed "s/raw/photos/g"`
    output_thumbnail=`echo $output | sed -r "s/(.(png|jpg))/.thumbnail\1/g"`
    base=`basename $output`
    dirname=`echo $output | sed "s/$base/''/g"`
    mkdir -p $dirname
    echo "convert: from $source to $output"
    convert -resize 1920\> $source $output
    convert -resize 480\> $source $output_thumbnail
  done
' sh {} +
