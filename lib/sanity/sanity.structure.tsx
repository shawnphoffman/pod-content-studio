// import { DocumentTextIcon } from '@sanity/icons'

import { DefaultDocumentNodeResolver, StructureResolver } from 'sanity/structure'

import AwardPreview from '@/components/studio/AwardPreview'

export const podStructure: StructureResolver = S =>
	S.list()
		.title('Content')
		.items([
			//
			S.listItem()
				.title('Posts by Podcast')
				.child(
					S.documentTypeList('category')
						.title('Posts by Podcast')
						.child(categoryId =>
							S.documentList().title('Posts').filter('_type == "post" && $categoryId in categories[]._ref').params({ categoryId })
						)
				),
			//
			S.listItem()
				.title('Posts by Author')
				.child(
					S.documentTypeList('author')
						.title('Posts by Author')
						.child(authorId => S.documentList().title('Posts').filter('_type == "post" && $authorId == author._ref').params({ authorId }))
				),
			//
			S.divider(),
			//
			...S.documentTypeListItems().filter(listItem => !['siteSettings'].includes(listItem.getId()!)),
			//
			S.divider(),
			//
			S.listItem()
				.title('Test')
				.child(
					S.documentTypeList('category')
						.title('Content by Podcast')
						.child(categoryId =>
							S.list()
								.title('Content by Podcast')
								.items([
									S.listItem()
										.title('Posts')
										.child(
											S.documentList().title('Posts').filter('_type == "post" && $categoryId in categories[]._ref').params({ categoryId })
										),
									S.listItem()
										.title('Awards')
										.child(
											S.documentList().title('Awards').filter('_type == "award" && category._ref == $categoryId').params({ categoryId })
										),
								])
						)
				),
		])

// const JsonPreview = ({ document }) => (
// 	<div className="text-xs">
// 		<h1>JSON Data for "{document.displayed.title}"</h1>
// 		<pre>{JSON.stringify(document.displayed, null, 2)}</pre>
// 	</div>
// )

export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
	// export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (S, { documentId, schemaType }) => {
	// if (schemaType === "awards" || documentId === "siteSettings") {
	if (schemaType === 'award') {
		return S.document().views([
			S.view.form(),
			//
			S.view.component(AwardPreview).title('Preview'),
		])
	}
	return S.document().views([S.view.form()])
}

/*
 // S.listItem()
			// 	.title('Ignore This')
			// 	.child(
			// 		S.list()
			// 			// Sets a title for our new list
			// 			.title('Settings Documents')
			// 			// Add items to the array
			// 			// Each will pull one of our new singletons
			// 			.items([
			// 				S.listItem().title('Metadata').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
			// 				// S.listItem().title('Site Colors').child(S.document().schemaType('colors').documentId('colors')),
			// 				// S.listItem().title('Main Navigation').child(S.document().schemaType('navigation').documentId('navigation')),
			// 			])
			// 	),
			// We also need to remove the new singletons from the main list
			// ...S.documentTypeListItems().filter(listItem => !['siteSettings', 'colors', 'navigation'].includes(listItem.getId())),
			// ...S.documentTypeListItems().filter(listItem => !['siteSettings'].includes(listItem.getId())),
 */
