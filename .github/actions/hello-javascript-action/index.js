import Twitter from 'twitter';
import { getInput, setFailed } from '@actions/core';
import { context } from '@actions/github';

// ncc build index.js で作らなかったら node_modules を全部コミットしなきゃいけない
try {
    console.log(`Hello ${context.ref}!`);
    console.log(`Hello ${context.payload.repository.html_url}!`);

    // https://github.community/t/how-to-get-just-the-tag-name/16241/20
    // github.event.release.tag_name が使えそうだけどどこにあるんだろう
    const message = JSON.stringify(github)
    console.log(message)

    // tweet
    var client = new Twitter({
        // secretsはActionsから直接手を伸ばせない（出来たら危険だ）ので、workflowから引き渡したのを受け取る
        consumer_key: getInput("consumer_key"),
        consumer_secret: getInput("consumer_secret"),
        access_token_key: getInput("access_token_key"),
        access_token_secret: getInput("access_token_secret")
    });
    client.post('statuses/update', {
        status: message
    }, function (error, tweet, response) {
        if (error) throw error;
        console.log(tweet);
        console.log(response);
    });
} catch (error) {
    setFailed(error.message);
}