app.controller('BlogDetailController',function($routeParams,$scope,BlogService)
{
	//alert('Entering BlogDetailController!')
	var id=$routeParams.id
	$scope.blogPost={}
	$scope.comment={body:'',blogPost:{}}
													//instead of writing function and calling explicitly, we can call the service function directly
	$scope.blogPost=BlogService.getBlogDetail(id) 	//calling service function directly
		.then(
		function(response)
		{
			console.log(response.data);
			console.log(response.status)
			$scope.blogPost=response.data;
			$scope.showComments=false;
		}
		,
		function(response)
		{
			console.log(response.status)
			$location.path('/login')
		})
	
		$scope.editPost=function()
		{
		$scope.isEditPost=true;
		BlogService.editPost()
		}
	
		$scope.getComments=function(blogId)
		{
		$scope.showComments=true;
		console.log('getComments ' + blogId)
		$scope.comments=BlogService.getComments(blogId)
		.then(function(response)
		{
			$scope.comments=response.data;
		}
		,
		function(response)
		{
			console.log('comments ' + response.status)
		})
		
	}
	
	$scope.addComment=function()
	{
		//alert($scope.blogPost.id)
		$scope.comment.blogPost.id = $scope.blogPost.id;
		$scope.comment.blogPost=$scope.blogPost
		//alert($scope.comment.body)
		//alert($scope.comment.blogPost)
        BlogService.addComment($scope.comment)
        .then(function(response)
        {
        	console.log(response.data)
        	console.log(response.status)
        	$scope.comment.body=''
        }
        ,
        function(response)
        {
        	console.log(response.status)
        })
	}
})